import axios from 'axios';
import { browserLocalPersistence } from 'firebase/auth';
import { Account } from '../models/account';
import Category from '../models/category';
import { Status } from '../models/status';
import { Transaction } from '../models/transaction';
import { auth } from './firebase';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

api.interceptors.request.use(async (config) => {
  try {
    await auth.setPersistence(browserLocalPersistence);
    const token = (await auth.currentUser?.getIdToken(true)) as string;

    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.error(err);
  }

  return config;
});

export async function getCategories(): Promise<Category[]> {
  const response = await api.get('/categories');
  return response.data as Category[];
}

export async function createNewCategory(category: Category): Promise<void> {
  await api.post('/categories', category);
}

export async function updateExistingCategory(category: Category): Promise<void> {
  await api.put(`/categories/${category.id}`, category);
}

export async function deleteExistingCategory(category: Category): Promise<void> {
  await api.delete(`/categories/${category.id}`);
}

export async function getAccounts(): Promise<Account[]> {
  const response = await api.get('/accounts');
  return response.data as Account[];
}

export async function createNewAccount(account: Account): Promise<void> {
  await api.post('/accounts', account);
}

export async function updateExistingAccount(account: Account): Promise<void> {
  await api.put(`/accounts/${account.id}`, account);
}

export async function deleteExistingAccount(account: Account): Promise<void> {
  await api.delete(`/accounts/${account.id}`);
}

interface GetTransactionsRequest {
  startDate: Date;
  endDate?: Date;
}

export async function getTransactions(req: GetTransactionsRequest): Promise<Transaction[]> {
  const response = await api.get('/transactions', {
    params: {
      ...req
    }
  });
  return response.data as Transaction[];
}

export interface CreateTransactionRequest {
  id: string;
  type: string;
  recurrence: string;
  categoryId: string;
  accountId: string;
  amount: number;
  date?: Date;
  description?: string;
}

export async function createTransaction(req: CreateTransactionRequest): Promise<void> {
  await api.post('/transactions', req);
}

export interface UpdateTransactionRequest {
  transactionId: string;
  categoryId: string;
  amount: number;
  date: Date;
}

export async function updateTransaction(req: UpdateTransactionRequest): Promise<void> {
  await api.put(`/transactions/${req.transactionId}`, req);
}

export type Month =
  | 'JANUARY'
  | 'FEBRUARY'
  | 'MARCH'
  | 'APRIL'
  | 'MAY'
  | 'JUNE'
  | 'JULY'
  | 'AUGUST'
  | 'SEPTEMBER'
  | 'OCTOBER'
  | 'NOVEMBER'
  | 'DECEMBER';

export async function getStatus(year: number, month: Month): Promise<Status> {
  const response = await api.get('/status', { params: { year, month } });
  return response.data as Status;
}
