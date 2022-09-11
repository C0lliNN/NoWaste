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
    initAuth: (state: Auth) => {
      const user = localStorage.getItem('user');
      if (user == null) {
        state.authenticated = false;
        state.user = undefined;
      } else {
        state.user = JSON.parse(user);
        state.authenticated = true;
      }
    },
    loginStart: (state: Auth) => {
      state.loading = true;
    },
    loginSuccess: (state: Auth, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.authenticated = true;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    loginFailed: (state: Auth) => {
      state.loading = false;
    },
    logout: (state: Auth) => {
      state.user = undefined;
      state.authenticated = false;
      localStorage.removeItem('user');
    }
  }
});

export default authSlice.reducer;

export const { initAuth, loginSuccess, loginStart, loginFailed, logout } = authSlice.actions;
