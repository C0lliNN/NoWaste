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
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.authenticated = true;
    },
    logout: (state) => {
      state.user = undefined;
      state.authenticated = false;
    }
  }
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;
