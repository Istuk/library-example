import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booksIndexReducer from 'features/books/booksIndexSlice';
import customersIndexReducer from 'features/customers/customersIndexSlice';
import bookDetailsStore from 'features/bookDetails/bookDetailsSlice';
import countriesReducer from 'features/countries/countriesSlice';
import customerDetailsReducer from 'features/customerDetails/customerDetailsSlice';

export const store = configureStore({
  reducer: {
    booksIndex: booksIndexReducer,
    bookDetails: bookDetailsStore,
    countries: countriesReducer,
    customersIndex: customersIndexReducer,
    customerDetails: customerDetailsReducer
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
