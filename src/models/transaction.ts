import { Account } from './account';
import Category from './category';

export type TransactionType = 'EXPENSE' | 'INCOME';

export type TransactionRecurrence = 'ONE_TIME' | 'MONTHLY';

export interface Transaction {
  id: string;
  type: TransactionType;
  recurrence: TransactionRecurrence;
  category: Category;
  account: Account;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
}
