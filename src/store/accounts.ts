import { uuidv4 } from '@firebase/util';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Account } from '../models/account';
import {
  createNewAccount,
  deleteExistingAccount,
  getAccounts,
  updateExistingAccount
} from '../services/api';

interface AccountState {
  accounts: Account[];
  loading: boolean;
  error?: string;
}

const initialAccount: AccountState = {
  accounts: [],
  loading: false
};

export const fetchAccounts = createAsyncThunk(
  'account/fetchAccounts',
  async () => await getAccounts()
);

export const createAccount = createAsyncThunk(
  'account/createAccount',
  async (account: Omit<Account, 'id'>) => {
    const createdAccount = { ...account, id: uuidv4() };
    await createNewAccount(createdAccount);
    return createdAccount;
  }
);

export const updateAccount = createAsyncThunk('account/updateAccount', async (account: Account) => {
  await updateExistingAccount(account);
  return account;
});

export const deleteAccount = createAsyncThunk('account/deleteAccount', async (account: Account) => {
  await deleteExistingAccount(account);
  return account;
});

const accountSlice = createSlice({
  name: 'Account',
  initialState: initialAccount,
  reducers: {},
  extraReducers: {
    [fetchAccounts.pending.type]: (state) => {
      state.loading = true;
      state.accounts = [];
      state.error = undefined;
    },
    [fetchAccounts.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.accounts = action.payload;
      state.error = undefined;
    },
    [fetchAccounts.rejected.type]: (state, action) => {
      state.loading = false;
      state.accounts = [];
      state.error = action.error.message;
    },
    [createAccount.pending.type]: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    [createAccount.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.accounts.push(action.payload);
      state.error = undefined;
    },
    [createAccount.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updateAccount.pending.type]: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    [updateAccount.fulfilled.type]: (state, action) => {
      state.loading = false;

      const account: Account = action.payload;
      const i = state.accounts.findIndex((c) => c.id === account.id);

      state.accounts[i] = account;
      state.error = undefined;
    },
    [updateAccount.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteAccount.pending.type]: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    [deleteAccount.fulfilled.type]: (state, action) => {
      state.loading = false;

      const account: Account = action.payload;
      const i = state.accounts.findIndex((c) => c.id === account.id);

      state.accounts.splice(i, 1);
      state.error = undefined;
    },
    [deleteAccount.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
  }
});

export default accountSlice.reducer;
