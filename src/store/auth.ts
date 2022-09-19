import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/user';

interface Auth {
  user?: User;
  authenticated: boolean;
  loading: boolean;
}

const initialAuth: Auth = {
  authenticated: false,
  loading: false
};

interface LoginPayload {
  user: User;
}

const authSlice = createSlice({
  name: 'Auth',
  initialState: initialAuth,
  reducers: {
    loginStart: (state: Auth) => {
      state.loading = true;
    },
    loginSuccess: (state: Auth, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.authenticated = true;
      state.loading = false;
    },
    loginFailed: (state: Auth) => {
      state.loading = false;
    },
    logout: (state: Auth) => {
      state.user = undefined;
      state.authenticated = false;
    }
  }
});

export default authSlice.reducer;

export const { loginSuccess, loginStart, loginFailed, logout } = authSlice.actions;
