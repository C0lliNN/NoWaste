import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import User from '../models/user';
import { handleFirebaseGithubLogin, handleFirebaseGoogleLogin } from '../services/firebase';

interface Auth {
  user?: User;
  authenticated: boolean;
  error: string | null;
  loading: boolean;
}

const initialAuth: Auth = {
  authenticated: false,
  loading: false,
  error: null
};

type Provider = 'GOOGLE' | 'GITHUB';

export const login = createAsyncThunk('auth/login', async (provider: Provider) => {
  switch (provider) {
    case 'GOOGLE':
      return await handleFirebaseGoogleLogin();
    case 'GITHUB':
      return await handleFirebaseGithubLogin();
  }
});

const authSlice = createSlice({
  name: 'Auth',
  initialState: initialAuth,
  reducers: {
    logout: (state: Auth) => {
      state.user = undefined;
      state.error = null;
      state.authenticated = false;
    }
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled.type]: (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
      state.loading = false;
      state.error = null;
    },
    [login.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
  }
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
