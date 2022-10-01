import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { newTransaction } from '../../test/TransactionFactory';
import { AuthorizationError } from '../errors/AuthorizationError';
import { ValidationError } from '../errors/ValidationError';
import { CreateTransactionRequest } from './CreateTransactionRequest';
import { Transaction, Category, Account } from './Transaction';
import { TransactionQuery } from './TransactionQuery';
import { TransactionService } from './TransactionService';

function newTransactionRepositoryMock() {
  return {
    findByQuery: jest.fn(async (query: TransactionQuery) => [] as Transaction[]),
    findById: jest.fn(async (id: string) => ({} as Transaction)),
    save: jest.fn(async (transaction: Transaction) => {})
  };
}

function newCategoryServiceMock() {
  return {
    getCategory: jest.fn(async ({ categoryId, userId: string }) => ({} as Category))
  };
}

function newAccountServiceMock() {
  return {
    getAccount: jest.fn(async ({ accountId, userId: string }) => ({} as Account)),
    updateAmount: jest.fn(
      async ({ userId, accountId: string, amountToBeIncremented: number }) => {}
    )
  };
}

function newClockMock() {
  return {
    newDate: jest.fn(() => new Date())
  };
}

function newTransactionService() {
  const transactionRepository = newTransactionRepositoryMock();

  const accountService = newAccountServiceMock();
  const categoryService = newCategoryServiceMock();
  const clock = newClockMock();

  return new TransactionService(transactionRepository, accountService, categoryService, clock);
}

describe('TransactionService', () => {
  describe('getTransactions', () => {
    it('should throw an error when the transaction repository fails', () => {
      const transactionRepository = newTransactionRepositoryMock();
      transactionRepository.findByQuery.mockReturnValue(Promise.reject(new Error('some error')));

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);

      expect(
        transactionService.getTransactions({ userId: 'some-id', startDate: new Date() })
      ).rejects.toThrowError();
    });
    it('should return the transactions when the repository is successful', () => {
      const transactionRepository = newTransactionRepositoryMock();
      transactionRepository.findByQuery.mockReturnValue(
        Promise.resolve([newTransaction(), newTransaction()])
      );

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);

      expect(
        transactionService.getTransactions({ userId: 'some-id', startDate: new Date() })
      ).resolves.toHaveLength(2);
    });
  });
  describe('getTransaction', () => {
    it('should throw an error when the repository call is not successful', () => {
      const transactionRepository = newTransactionRepositoryMock();
      transactionRepository.findById.mockReturnValue(Promise.reject(new Error('some error')));

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);

      expect(
        transactionService.getTransaction({ transactionId: 't-id', userId: 'u-id' })
      ).rejects.toThrowError();
    });

    it('should throw an error when the current user does not own the transaction', () => {
      const transaction = newTransaction();
      const transactionRepository = newTransactionRepositoryMock();

      transactionRepository.findById.mockReturnValue(Promise.resolve(transaction));

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);

      expect(
        transactionService.getTransaction({ transactionId: 't-id', userId: 'u-id' })
      ).rejects.toThrowError(AuthorizationError);
    });

    it('should bit throw any error when the current user owns the transaction', () => {
      const transaction = newTransaction();
      const transactionRepository = newTransactionRepositoryMock();

      transactionRepository.findById.mockReturnValue(Promise.resolve(transaction));

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);

      expect(
        transactionService.getTransaction({
          transactionId: transaction.id,
          userId: transaction.userId
        })
      ).resolves.not.toThrowError();
    });
  });

  describe('createTransaction', () => {
    let req: CreateTransactionRequest;
    beforeEach(() => {
      req = {
        id: 'transaction-id',
        userId: 'user-id',
        type: 'EXPENSE',
        recurrence: 'ONE_TIME',
        categoryId: 'category-id',
        accountId: 'account-id',
        date: new Date('2022-09-01'),
        amount: 200
      };
    });

    it('should return a ValidationError if data is not valid', () => {
      req.id = '';

      const service = newTransactionService();

      expect(() => service.createTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should return an Error if category is not found', () => {
      const categoryService = newCategoryServiceMock();
      categoryService.getCategory.mockReturnValue(Promise.reject(new Error('some error')));

      const service = newTransactionService();
      service.setCategoryService(categoryService);

      expect(() => service.createTransaction(req)).rejects.toThrowError();
    });

    it('should return an Error if account is not found', () => {
      const accountService = newAccountServiceMock();
      accountService.getAccount.mockReturnValue(Promise.reject(new Error('some error')));

      const service = newTransactionService();
      service.setAccountService(accountService);

      expect(() => service.createTransaction(req)).rejects.toThrowError();
    });

    it('should return an Error if account cannot be updated', () => {
      const accountService = newAccountServiceMock();
      accountService.updateAmount.mockReturnValue(Promise.reject(new Error('some error')));

      const service = newTransactionService();
      service.setAccountService(accountService);

      expect(() => service.createTransaction(req)).rejects.toThrowError();
    });

    it('should return an Error if transaction cannot be saved', () => {
      const transactionRepo = newTransactionRepositoryMock();
      transactionRepo.save.mockReturnValue(Promise.reject(new Error('some error')));

      const service = newTransactionService();
      service.setTransactionRepository(transactionRepo);

      expect(() => service.createTransaction(req)).rejects.toThrowError();
    });

    it('should not return any Error if transaction is saved successfully', () => {
      const service = newTransactionService();

      expect(service.createTransaction(req)).resolves.not.toThrowError();
    });
  });

  describe('validateCreateRequest', () => {
    let req: CreateTransactionRequest;

    beforeEach(() => {
      req = {
        id: 'transaction-id',
        userId: 'user-id',
        type: 'EXPENSE',
        recurrence: 'ONE_TIME',
        categoryId: 'category-id',
        accountId: 'account-id',
        date: new Date(),
        amount: 200
      };
    });

    it('should throw an error if id is empty', () => {
      req.id = '';

      const service = newTransactionService();

      expect(() => service.createTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error if userId is empty', () => {
      req.userId = '';

      const service = newTransactionService();

      expect(() => service.createTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error if type is invalid', () => {
      req.type = 'invalid';

      const service = newTransactionService();

      expect(() => service.createTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error if recurrence is invalid', () => {
      req.recurrence = 'invalid';

      const service = newTransactionService();

      expect(() => service.createTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error if categoryId is empty', () => {
      req.categoryId = '';

      const service = newTransactionService();

      expect(() => service.createTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error if accountId is empty', () => {
      req.accountId = '';

      const service = newTransactionService();

      expect(() => service.createTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error if date is not present', () => {
      req.date = undefined;

      const service = newTransactionService();

      expect(() => service.createTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error if amount is negative', () => {
      req.amount = -400;

      const service = newTransactionService();

      expect(() => service.createTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should not throw a ValidationError error if data is valid', () => {
      const service = newTransactionService();

      expect(service.createTransaction(req)).resolves.not.toThrowError(ValidationError);
    });
  });
});
