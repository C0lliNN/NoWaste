import { Account, Category, TransactionRecurrence, TransactionType } from './Transaction';

export interface TransactionResponse {
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
