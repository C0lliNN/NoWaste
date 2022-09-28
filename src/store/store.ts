import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk, { ThunkDispatch } from 'redux-thunk';
import accountsReducer from './accounts';
import authReducer from './auth';
import categoriesReducer from './categories';

const persistConfig = {
  key: 'root',
  storage
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    categories: persistReducer(persistConfig, categoriesReducer),
    accounts: persistReducer(persistConfig, accountsReducer)
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const persistor = persistStore(store);

export default store;
