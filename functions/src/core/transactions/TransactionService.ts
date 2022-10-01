import { AuthorizationError } from '../errors/AuthorizationError';
import { GetTransactionsRequest } from './GetTransactionsRequest';
import { Transaction } from './Transaction';
import { TransactionQuery } from './TransactionQuery';
import { TransactionResponse } from './TransactionResponse';

interface TransactionRepository {
  findByQuery(query: TransactionQuery): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction>;
}

interface AccountService {}

interface CategoryService {}

interface Clock {}

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

  createTransaction() {}

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
