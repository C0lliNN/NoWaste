import { describe, expect, it, jest } from '@jest/globals';
import { newTransaction } from '../../test/TransactionFactory';
import { Transaction } from './Transaction';
import { TransactionQuery } from './TransactionQuery';
import { TransactionService } from './TransactionService';

function newTransactionRepositoryMock() {
  return {
    findByQuery: jest.fn(async (query: TransactionQuery) => [] as Transaction[])
  };
}

function newAccountServiceMock() {
  return {};
}

function newCategoryServiceMock() {
  return {};
}

function newClockMock() {
  return {};
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
});
