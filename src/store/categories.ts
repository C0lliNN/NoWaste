import { uuidv4 } from '@firebase/util';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Category from '../models/category';
import { createNewCategory, getCategories } from '../services/api';

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
      console.log(action);
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
    }
  }
});

export default categorySlice.reducer;
