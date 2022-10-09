import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import thunk, { ThunkDispatch } from 'redux-thunk';
import accountsReducer from './accounts';
import authReducer from './auth';
import categoriesReducer from './categories';

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    accounts: accountsReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const persistor = persistStore(store);

export default store;
