import * as dayjs from 'dayjs';
import { FieldError, ValidationError } from '../errors/ValidationError';
import { AccountResponse, AccountService } from './AccountService';
import { getMonthNumber, GetUserStatusRequest, isMonth, Month } from './GetUserStatusRequest';
import { TransactionResponse, TransactionService } from './TransactionService';
import { AccountBalance, ExpenseByCategory, UserStatusResponse } from './UserStatusResponse';

export interface Clock {
  newDate(): Date;
}

export class ReportService {
  accountService: AccountService;
  transactionService: TransactionService;

  constructor(accountService: AccountService, transactionService: TransactionService) {
    this.accountService = accountService;
    this.transactionService = transactionService;
  }

  async getUserStatus(req: GetUserStatusRequest): Promise<UserStatusResponse> {
    this.validateGetUserStatusRequest(req);

    const accounts = await this.accountService.getAccounts({
      userId: req.userId,
      sortBy: 'balance',
      sortDirection: 'desc'
    });
    const transactions = await this.getTransactions(req);

    const monthIncome = this.getMonthIncome(transactions);
    const monthExpense = this.getMonthExpense(transactions);
    const monthBalance = this.getMonthBalance(transactions);
    const totalBalance = this.getTotalBalance(accounts);
    const expensesByCategory = this.getExpensesByCategory(transactions);
    const balancesByAccount = this.getBalancesByAccount(accounts);

    return {
      monthIncome,
      monthExpense,
      monthBalance,
      totalBalance,
      expensesByCategory,
      balancesByAccount
    };
  }

  private validateGetUserStatusRequest(req: GetUserStatusRequest) {
    const errors: FieldError[] = [];

    if (!req.month || !req.month.trim()) {
      errors.push({ field: 'month', message: 'this field cannot be empty' });
    }

    if (errors.length === 0 && !isMonth(req.month)) {
      errors.push({ field: 'month', message: 'this field must be a valid uppercase month' });
    }

    if (!req.userId || !req.userId.trim()) {
      errors.push({ field: 'userId', message: 'this field cannot be empty' });
    }

    if (errors.length) {
      throw new ValidationError(...errors);
    }
  }

  private getBalancesByAccount(accounts: AccountResponse[]): AccountBalance[] {
    return accounts.map((a) => ({ accountName: a.name, balance: a.balance }));
  }

  private getTotalBalance(accounts: AccountResponse[]): number {
    return accounts.reduce(
      (previousValue, currentValue) => previousValue + currentValue.balance,
      0
    );
  }

  private async getTransactions(req: GetUserStatusRequest) {
    const month = req.month as Month;
    const date = dayjs().year(req.year).month(getMonthNumber(month));

    return await this.transactionService.getTransactions({
      userId: req.userId,
      startDate: date.startOf('month').toDate(),
      endDate: date.endOf('month').toDate()
    });
  }

  private getMonthIncome(transactions: TransactionResponse[]): number {
    return transactions
      .filter((t) => t.type === 'INCOME')
      .reduce((previous, current) => previous + current.amount, 0);
  }

  private getMonthExpense(transactions: TransactionResponse[]): number {
    return transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((previous, current) => previous + current.amount, 0);
  }

  private getMonthBalance(transactions: TransactionResponse[]): number {
    return this.getMonthIncome(transactions) - this.getMonthExpense(transactions);
  }

  private getExpensesByCategory(transactions: TransactionResponse[]): ExpenseByCategory[] {
    const filteredTransactions = transactions
      .filter((t) => t.type === 'EXPENSE')
      .map((t) => ({ categoryName: t.category.name, expense: t.amount }));

    // TODO: Refactor this. Probably there is a more elegant way of doing it
    for (let i = 0; i < filteredTransactions.length - 1; i++) {
      for (let j = i + 1; j < filteredTransactions.length; j++) {
        if (filteredTransactions[i].categoryName === filteredTransactions[j].categoryName) {
          filteredTransactions[i].expense += filteredTransactions[j].expense;
          filteredTransactions.splice(j, 1);
          j--;
        }
      }
    }

    return filteredTransactions.sort((a, b) => b.expense - a.expense);
  }
}
