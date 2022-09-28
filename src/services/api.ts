import axios from 'axios';
import { browserLocalPersistence } from 'firebase/auth';
import { Account } from '../models/account';
import Category from '../models/category';
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
