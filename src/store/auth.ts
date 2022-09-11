import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/user';

interface Auth {
  user?: User;
  authenticated: boolean;
}

const initialAuth: Auth = {
  authenticated: false
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
    login: (state: Auth, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.authenticated = true;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state: Auth) => {
      state.user = undefined;
      state.authenticated = false;
      localStorage.removeItem('user');
    }
  }
});

export default authSlice.reducer;

export const { initAuth, login, logout } = authSlice.actions;
