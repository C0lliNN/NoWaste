import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { newTransaction } from '../../test/TransactionFactory';
import { AuthorizationError } from '../errors/AuthorizationError';
import { ValidationError } from '../errors/ValidationError';
import { CreateTransactionRequest } from './CreateTransactionRequest';
import { Transaction, Category, Account } from './Transaction';
import { TransactionQuery } from './TransactionQuery';
import { TransactionService } from './TransactionService';
import { UpdateTransactionRequest } from './UpdateTransactionRequest';
import { UpdateAmountRequest } from '../accounts/UpdateAmountRequest';

function newTransactionRepositoryMock() {
  return {
    findByQuery: jest.fn(async (query: TransactionQuery) => [] as Transaction[]),
    findById: jest.fn(async (id: string) => ({} as Transaction)),
    save: jest.fn(async (transaction: Transaction) => {})
  };
}

function newCategoryServiceMock() {
  return {
    getCategory: jest.fn(async ({ categoryId, userId: string }) => ({} as Category)),
    incrementUseCount: jest.fn(async (categoryId: string) => {})
  };
}

function newAccountServiceMock() {
  return {
    getAccount: jest.fn(async ({ accountId, userId: string }) => ({} as Account)),
    updateAmount: jest.fn(async (req: UpdateAmountRequest) => {}),
    incrementUseCount: jest.fn(async (accountId: string) => {})
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

  describe('updateTransaction', () => {
    let req: UpdateTransactionRequest;

    beforeEach(() => {
      req = {
        transactionId: 'transaction-id',
        userId: 'user-id',
        categoryId: 'category-id',
        amount: 100,
        date: new Date('2022-05-05')
      };
    });

    it('should throw an ValidationError when data is not valid', () => {
      req.transactionId = '';

      const transactionService = newTransactionService();

      expect(transactionService.updateTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error when transaction is not found', () => {
      const transactionRepository = newTransactionRepositoryMock();
      transactionRepository.findById.mockReturnValue(Promise.reject(new Error('some error')));

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);

      expect(transactionService.updateTransaction(req)).rejects.toThrowError();
    });

    it('should throw an error when transaction is not found', () => {
      const transactionRepository = newTransactionRepositoryMock();
      transactionRepository.findById.mockReturnValue(Promise.reject(new Error('some error')));

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);

      expect(transactionService.updateTransaction(req)).rejects.toThrowError();
    });

    it('should throw an Authorization error user is not the owner of the transaction', () => {
      const transaction = newTransaction();
      const transactionRepository = newTransactionRepositoryMock();
      transactionRepository.findById.mockReturnValue(Promise.resolve(transaction));

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);

      expect(transactionService.updateTransaction(req)).rejects.toThrowError(AuthorizationError);
    });

    it('should throw an Error when category is not found', () => {
      const transaction = newTransaction();
      req.userId = transaction.userId;

      const transactionRepository = newTransactionRepositoryMock();
      transactionRepository.findById.mockReturnValue(Promise.resolve(transaction));

      const categoryService = newCategoryServiceMock();
      categoryService.getCategory.mockReturnValue(Promise.reject(new Error('some error')));

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);
      transactionService.setCategoryService(categoryService);

      expect(transactionService.updateTransaction(req)).rejects.toThrowError();
    });

    it('should throw an Error when amount cannot be updated', () => {
      const transaction = newTransaction();
      req.userId = transaction.userId;

      const transactionRepository = newTransactionRepositoryMock();
      transactionRepository.findById.mockReturnValue(Promise.resolve(transaction));

      const categoryService = newCategoryServiceMock();
      categoryService.getCategory.mockReturnValue(Promise.resolve(transaction.category));

      const accountService = newAccountServiceMock();
      accountService.updateAmount.mockReturnValue(Promise.reject(new Error('some error')));

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);
      transactionService.setCategoryService(categoryService);
      transactionService.setAccountService(accountService);

      expect(transactionService.updateTransaction(req)).rejects.toThrowError();
    });

    it('should throw an Error when transaction cannot be updated', () => {
      const transaction = newTransaction();
      req.userId = transaction.userId;

      const transactionRepository = newTransactionRepositoryMock();
      transactionRepository.findById.mockReturnValue(Promise.resolve(transaction));
      transactionRepository.save.mockReturnValue(Promise.reject(new Error('some error')));

      const categoryService = newCategoryServiceMock();
      categoryService.getCategory.mockReturnValue(Promise.resolve(transaction.category));

      const accountService = newAccountServiceMock();

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);
      transactionService.setCategoryService(categoryService);
      transactionService.setAccountService(accountService);

      expect(transactionService.updateTransaction(req)).rejects.toThrowError();
    });

    it('should not throw any Error when transaction saved successfully', () => {
      const transaction = newTransaction();
      req.userId = transaction.userId;

      const transactionRepository = newTransactionRepositoryMock();
      transactionRepository.findById.mockReturnValue(Promise.resolve(transaction));

      const categoryService = newCategoryServiceMock();
      categoryService.getCategory.mockReturnValue(Promise.resolve(transaction.category));

      const accountService = newAccountServiceMock();

      const transactionService = newTransactionService();
      transactionService.setTransactionRepository(transactionRepository);
      transactionService.setCategoryService(categoryService);
      transactionService.setAccountService(accountService);

      expect(transactionService.updateTransaction(req)).resolves.not.toThrowError();
    });
  });

  describe('validateUpdateTransaction', () => {
    let req: UpdateTransactionRequest;

    beforeEach(() => {
      req = {
        transactionId: 'transaction-id',
        userId: 'user-id',
        categoryId: 'category-id',
        amount: 100,
        date: new Date('2022-05-05')
      };
    });

    it('should throw an error when transactionId is empty', () => {
      req.transactionId = '';

      const transactionService = newTransactionService();

      expect(transactionService.updateTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error when userId is empty', () => {
      req.userId = '';

      const transactionService = newTransactionService();

      expect(transactionService.updateTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error when categoryId is empty', () => {
      req.categoryId = '';

      const transactionService = newTransactionService();

      expect(transactionService.updateTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error when amount is negative', () => {
      req.amount = -1;

      const transactionService = newTransactionService();

      expect(transactionService.updateTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error when date is not present', () => {
      req.date = undefined;

      const transactionService = newTransactionService();

      expect(transactionService.updateTransaction(req)).rejects.toThrowError(ValidationError);
    });

    it('should not throw any error when data is valid', () => {
      const transactionService = newTransactionService();

      expect(transactionService.updateTransaction(req)).rejects.not.toThrowError(ValidationError);
    });
  });
});
