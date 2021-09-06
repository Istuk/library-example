import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booksIndexReducer from 'features/books/booksIndexSlice';
import customersIndexReducer from 'features/customers/customersIndexSlice';

export const store = configureStore({
  reducer: {
    booksIndex: booksIndexReducer,
    customersIndex: customersIndexReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
