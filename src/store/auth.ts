import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Auth {
  authenticated: boolean;
  token: string;
}

const initialAuth: Auth = {
  authenticated: false,
  token: ''
};

interface LoginPayload {
  token: string;
}

const authSlice = createSlice({
  name: 'Auth',
  initialState: initialAuth,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.token = action.payload.token;
      state.authenticated = true;
    }
  }
});

export default authSlice.reducer;

export const { login } = authSlice.actions;
