import { describe, expect, it, jest } from '@jest/globals';
import { ValidationError } from '../errors/ValidationError';
import { AccountResponse, AccountService } from './AccountService';
import { GetUserStatusRequest } from './GetUserStatusRequest';
import { Clock, ReportService } from './ReportService';
import { TransactionResponse, TransactionService } from './TransactionService';

function newTransactionServiceMock() {
  return {
    getTransactions: jest.fn(
      async ({ userId: stringify, startDate, endDate: Date }) => ({} as TransactionResponse[])
    )
  };
}

function newAccountServiceMock() {
  return {
    getAccounts: jest.fn(async ({ userId: string }) => [] as AccountResponse[])
  };
}

function newClockMock() {
  return {
    newDate: jest.fn(() => new Date())
  };
}

interface CreateReportService {
  accountService?: AccountService;
  transactionService?: TransactionService;
  clock?: Clock;
}

function newReportServiceMock(req?: CreateReportService): ReportService {
  return new ReportService(
    req?.accountService ?? newAccountServiceMock(),
    req?.transactionService ?? newTransactionServiceMock(),
    req?.clock ?? newClockMock()
  );
}

describe('ReportService', () => {
  describe('getUserStatus', () => {
    it('should throw an error when the month is not valid', () => {
      const req: GetUserStatusRequest = {
        userId: 'some-id',
        month: 'jan'
      };

      const service = newReportServiceMock();

      expect(service.getUserStatus(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error when the userId is not valid', () => {
      const req: GetUserStatusRequest = {
        userId: '',
        month: 'MARCH'
      };

      const service = newReportServiceMock();

      expect(service.getUserStatus(req)).rejects.toThrowError(ValidationError);
    });

    it('should throw an error when the accountService not successful', () => {
      const req: GetUserStatusRequest = {
        userId: 'some-id',
        month: 'MARCH'
      };

      const accountServiceMock = newAccountServiceMock();
      accountServiceMock.getAccounts.mockReturnValue(Promise.reject(new Error('some error')));

      const service = newReportServiceMock({ accountService: accountServiceMock });

      expect(service.getUserStatus(req)).rejects.toThrowError(Error);
    });

    it('should throw an error when the transactionService not successful', () => {
      const req: GetUserStatusRequest = {
        userId: 'some-id',
        month: 'MARCH'
      };

      const transactionServiceMock = newTransactionServiceMock();
      transactionServiceMock.getTransactions.mockReturnValue(
        Promise.reject(new Error('some error'))
      );

      const service = newReportServiceMock({ transactionService: transactionServiceMock });

      expect(service.getUserStatus(req)).rejects.toThrowError(Error);
    });

    it('should return the correct mapped data when the data is fetched successfully', () => {
      const req: GetUserStatusRequest = {
        userId: 'some-id',
        month: 'MARCH'
      };

      const accounts: AccountResponse[] = [
        { name: 'Bank1', balance: 1000 },
        { name: 'Bank2', balance: 1500 }
      ];

      const accountServiceMock = newAccountServiceMock();
      accountServiceMock.getAccounts.mockReturnValue(Promise.resolve(accounts));

      const transactions: TransactionResponse[] = [
        { category: { name: 'Food' }, type: 'EXPENSE', amount: 400 },
        { category: { name: 'Food' }, type: 'EXPENSE', amount: 100 },
        { category: { name: 'Transportation' }, type: 'EXPENSE', amount: 100 },
        { category: { name: 'Salary' }, type: 'INCOME', amount: 4000 },
        { category: { name: 'Investments' }, type: 'INCOME', amount: 800.5 }
      ];

      const transactionServiceMock = newTransactionServiceMock();
      transactionServiceMock.getTransactions.mockReturnValue(Promise.resolve(transactions));

      const service = newReportServiceMock({
        transactionService: transactionServiceMock,
        accountService: accountServiceMock
      });

      expect(service.getUserStatus(req)).resolves.toEqual({
        monthIncome: 4800.5,
        monthExpense: 600,
        monthBalance: 4200.5,
        totalBalance: 2500,
        expensesByCategory: [
          { categoryName: 'Food', expense: 500 },
          { categoryName: 'Transportation', expense: 100 }
        ],
        balancesByAccount: [
          { accountName: 'Bank1', balance: 1000 },
          { accountName: 'Bank2', balance: 1500 }
        ]
      });
    });
  });
});
