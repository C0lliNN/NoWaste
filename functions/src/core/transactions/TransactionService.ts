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
import { TransactionResponse } from './TransactionResponse';

interface TransactionRepository {
  findByQuery(query: TransactionQuery): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction>;
  save(transaction: Transaction): Promise<void>;
}

interface GetCategoryRequest {
  categoryId: string;
  userId: string;
}

interface CategoryService {
  getCategory(req: GetCategoryRequest): Promise<Category>;
}

interface GetAccountRequest {
  accountId: string;
  userId: string;
}

interface UpdateAmountRequest {
  userId: string;
  accountId: string;
  amountToBeIncremented: number;
}

interface AccountService {
  getAccount(req: GetAccountRequest): Promise<Account>;
  updateAmount(req: UpdateAmountRequest): Promise<void>;
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

    const amountToBeIncremented = transaction.getAccountAmountToBeIncremented();
    await this.accountService.updateAmount({
      accountId: req.accountId,
      userId: req.userId,
      amountToBeIncremented: amountToBeIncremented
    });

    await this.transactionRepository.save(transaction);
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
      errors.push({ field: 'balance', message: 'this field must greater than 0' });
    }

    if (errors.length) {
      throw new ValidationError(...errors);
    }
  }

  updateTransaction() {}

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
