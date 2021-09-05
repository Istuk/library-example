import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booksIndexReducer from 'features/bookSearch/booksIndexSlice';

export const store = configureStore({
  reducer: {
    booksIndex: booksIndexReducer
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
