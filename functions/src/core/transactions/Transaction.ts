import { FieldError, ValidationError } from '../errors/ValidationError';

export type TransactionType = 'EXPENSE' | 'INCOME';

export type TransactionRecurrence = 'ONE_TIME' | 'MONTHLY';

interface Category {
  id: string;
  name: string;
}

interface Account {
  id: string;
  name: string;
}

export class Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  recurrence: TransactionRecurrence;
  category: Category;
  account: Account;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  description?: string;

  constructor(
    id: string,
    userId: string,
    type: TransactionType,
    recurrence: TransactionRecurrence,
    category: Category,
    account: Account,
    amount: number,
    createdAt: Date,
    updatedAt: Date,
    description?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.recurrence = recurrence;
    this.category = category;
    this.account = account;
    this.amount = amount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.description = description;
  }

  validate() {
    const errors: FieldError[] = [];

    if (!this.id || !this.id.trim()) {
      errors.push({ field: 'id', message: 'this field cannot be empty' });
    }

    if (!this.userId || !this.userId.trim()) {
      errors.push({ field: 'userId', message: 'this field cannot be empty' });
    }

    if (this.amount <= 0) {
      errors.push({ field: 'balance', message: 'this field must greater than 0' });
    }

    if (errors.length) {
      throw new ValidationError(...errors);
    }
  }
}
