import { AuthorizationError } from '../errors/AuthorizationError';
import { FieldError, ValidationError } from '../errors/ValidationError';
import { CreateTransactionRequest } from './CreateTransactionRequest';
import { GetTransactionsRequest } from './GetTransactionsRequest';
import {
  Account,
  Category,
  isTransactionRecurrence,
  isTransactionType,
  Transaction,
  TransactionRecurrence,
  TransactionType
} from './Transaction';
import { TransactionQuery } from './TransactionQuery';
import { TransactionRepository } from './TransactionRepository';
import { TransactionResponse } from './TransactionResponse';
import { UpdateTransactionRequest } from './UpdateTransactionRequest';

interface GetCategoryRequest {
  categoryId: string;
  userId: string;
}

interface CategoryService {
  getCategory(req: GetCategoryRequest): Promise<Category>;
  incrementUseCount(categoryId: string): Promise<void>;
}

interface GetAccountRequest {
  accountId: string;
  userId: string;
}

interface UpdateAmountRequest {
  userId: string;
  accountId: string;
  amountToBeUpdated: number;
}

interface AccountService {
  getAccount(req: GetAccountRequest): Promise<Account>;
  updateAmount(req: UpdateAmountRequest): Promise<void>;
  incrementUseCount(accountId: string): Promise<void>;
}

interface Clock {
  newDate(): Date;
}

export class TransactionService {
  transactionRepository: TransactionRepository;
  accountService: AccountService;
  categoryService: CategoryService;
  clock: Clock;

  constructor(
    transactionRepository: TransactionRepository,
    accountService: AccountService,
    categoryService: CategoryService,
    clock: Clock
  ) {
    this.transactionRepository = transactionRepository;
    this.accountService = accountService;
    this.categoryService = categoryService;
    this.clock = clock;
  }

  async getTransactions(req: GetTransactionsRequest): Promise<TransactionResponse[]> {
    const query: TransactionQuery = {
      ...req
    };

    const transactions = await this.transactionRepository.findByQuery(query);
    return transactions.map(this.mapEntityToResponse);
  }

  async getTransaction(req: GetTransactionRequest): Promise<TransactionResponse> {
    const transaction = await this.transactionRepository.findById(req.transactionId);
    if (transaction.userId !== req.userId) {
      throw new AuthorizationError('The requested action is forbidden');
    }

    return this.mapEntityToResponse(transaction);
  }

  async createTransaction(req: CreateTransactionRequest): Promise<void> {
    this.validateCreateRequest(req);

    const category = await this.categoryService.getCategory({
      userId: req.userId,
      categoryId: req.categoryId
    });
    const account = await this.accountService.getAccount({
      userId: req.userId,
      accountId: req.accountId
    });

    const transaction = new Transaction(
      req.id,
      req.userId,
      req.type as TransactionType,
      req.recurrence as TransactionRecurrence,
      category,
      account,
      req.amount,
      req.date as Date,
      this.clock.newDate(),
      this.clock.newDate(),
      req.description
    );

    transaction.validate();

    const amountToBeUpdated = transaction.calculateAccountAmountToBeUpdated();
    await this.accountService.updateAmount({
      accountId: req.accountId,
      userId: req.userId,
      amountToBeUpdated: amountToBeUpdated
    });

    await this.transactionRepository.save(transaction);
    await this.accountService.incrementUseCount(account.id);
    await this.categoryService.incrementUseCount(category.id);
  }

  private validateCreateRequest(req: CreateTransactionRequest) {
    const errors: FieldError[] = [];

    if (!req.id || !req.id.trim()) {
      errors.push({ field: 'id', message: 'this field cannot be empty' });
    }

    if (!req.userId || !req.userId.trim()) {
      errors.push({ field: 'userId', message: 'this field cannot be empty' });
    }

    if (!isTransactionType(req.type)) {
      errors.push({ field: 'type', message: 'The value must be either "INCOME" or "EXPENSE"' });
    }

    if (!isTransactionRecurrence(req.recurrence)) {
      errors.push({
        field: 'recurrence',
        message: 'The value must be either "ONE_TIME" or "MONTHLY"'
      });
    }

    if (!req.categoryId || !req.categoryId.trim()) {
      errors.push({ field: 'categoryId', message: 'this field cannot be empty' });
    }

    if (!req.accountId || !req.accountId.trim()) {
      errors.push({ field: 'accountId', message: 'this field cannot be empty' });
    }

    if (!req.date) {
      errors.push({ field: 'date', message: 'this field cannot be empty' });
    }

    if (req.amount <= 0) {
      errors.push({ field: 'amount', message: 'this field must greater than 0' });
    }

    if (errors.length) {
      throw new ValidationError(...errors);
    }
  }

  async updateTransaction(req: UpdateTransactionRequest): Promise<void> {
    this.validateUpdateRequest(req);

    const transaction = await this.transactionRepository.findById(req.transactionId);
    if (transaction.userId !== req.userId) {
      throw new AuthorizationError('The requested action is forbidden');
    }

    if (req.categoryId !== transaction.category.id) {
      const newCategory = await this.categoryService.getCategory({
        userId: req.userId,
        categoryId: req.categoryId
      });
      transaction.category = newCategory;
    }

    if (req.amount !== transaction.amount) {
      const amountToBeUpdated = transaction.calculateAccountAmountToBeUpdated(req.amount);
      await this.accountService.updateAmount({
        accountId: transaction.account.id,
        userId: req.userId,
        amountToBeUpdated: amountToBeUpdated
      });
      transaction.amount = req.amount;
    }

    transaction.date = req.date as Date;
    await this.transactionRepository.save(transaction);
  }

  private validateUpdateRequest(req: UpdateTransactionRequest) {
    const errors: FieldError[] = [];

    if (!req.transactionId || !req.transactionId.trim()) {
      errors.push({ field: 'transactionId', message: 'this field cannot be empty' });
    }

    if (!req.userId || !req.userId.trim()) {
      errors.push({ field: 'userId', message: 'this field cannot be empty' });
    }

    if (!req.categoryId || !req.categoryId.trim()) {
      errors.push({ field: 'categoryId', message: 'this field cannot be empty' });
    }

    if (req.amount <= 0) {
      errors.push({ field: 'amount', message: 'this field must greater than 0' });
    }

    if (!req.date) {
      errors.push({ field: 'date', message: 'this field cannot be empty' });
    }

    if (errors.length) {
      throw new ValidationError(...errors);
    }
  }

  private mapEntityToResponse(transaction: Transaction): TransactionResponse {
    return {
      id: transaction.id,
      type: transaction.type,
      recurrence: transaction.recurrence,
      category: transaction.category,
      account: transaction.account,
      amount: transaction.amount,
      date: transaction.date,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt
    };
  }

  setTransactionRepository(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }
  setAccountService(accountService: AccountService) {
    this.accountService = accountService;
  }

  setCategoryService(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  setClock(clock: Clock) {
    this.clock = clock;
  }
}
