import axios from 'axios';
import Category from '../models/category';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

api.interceptors.request.use((config) => {
  try {
    const data = localStorage.getItem('persist:root') as string;
    const token = JSON.parse(JSON.parse(data).user).accessToken as string;

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

export async function createNewCategory(category: Category): Promise<Category> {
  const response = await api.post('/categories', category);
  return response.data as Category;
}

export async function updateExistingCategory(category: Category): Promise<void> {
  await api.put(`/categories/${category.id}`, category);
}
