import { uuidv4 } from '@firebase/util';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Category from '../models/category';
import {
  createNewCategory,
  deleteExistingCategory,
  getCategories,
  updateExistingCategory
} from '../services/api';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error?: string;
}

const initialCategory: CategoryState = {
  categories: [],
  loading: false
};

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => await getCategories()
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (category: Omit<Category, 'id'>) => {
    const createdCategory = { ...category, id: uuidv4() };
    await createNewCategory(createdCategory);
    return createdCategory;
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (category: Category) => {
    await updateExistingCategory(category);
    return category;
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (category: Category) => {
    await deleteExistingCategory(category);
    return category;
  }
);

const categorySlice = createSlice({
  name: 'Category',
  initialState: initialCategory,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending.type]: (state) => {
      state.loading = true;
      state.categories = [];
      state.error = undefined;
    },
    [fetchCategories.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = undefined;
    },
    [fetchCategories.rejected.type]: (state, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.error.message;
    },
    [createCategory.pending.type]: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    [createCategory.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
      state.error = undefined;
    },
    [createCategory.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updateCategory.pending.type]: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    [updateCategory.fulfilled.type]: (state, action) => {
      state.loading = false;

      const category: Category = action.payload;
      const i = state.categories.findIndex((c) => c.id === category.id);

      state.categories[i] = category;
      state.error = undefined;
    },
    [updateCategory.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteCategory.pending.type]: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    [deleteCategory.fulfilled.type]: (state, action) => {
      state.loading = false;

      const category: Category = action.payload;
      const i = state.categories.findIndex((c) => c.id === category.id);

      state.categories.splice(i, 1);
      state.error = undefined;
    },
    [deleteCategory.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
  }
});

export default categorySlice.reducer;
