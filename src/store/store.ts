import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer)
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
