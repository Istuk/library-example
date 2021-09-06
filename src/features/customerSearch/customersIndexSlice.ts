import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";

export interface BooksIndexStore {
  customers: Customer[]
  loading: boolean
  loaded: boolean
  error?: string
}

const initialState: BooksIndexStore = {
  customers: [],
  loaded: false,
  loading: false
}

export const customersIndexSlice = createSlice({
  name: 'CustomerIndex',
  initialState,
  reducers: {
    loadCustomersStart(store) {
      store.loading = true;
    },
    loadCustomersSuccess(store, action: PayloadAction<Customer[]>) {
      store.customers = action.payload;

      store.loading = false;
      store.loaded = true;
    },
    loadCustomersFail(store, action: PayloadAction<string>) {
      store.loaded = false
      store.loading = false

      store.error = action.payload
    }
  }
});

export const {
  loadCustomersStart,
  loadCustomersSuccess,
  loadCustomersFail
} = customersIndexSlice.actions;

export const loadCustomers = (): AppThunk => (dispatch) => {
  dispatch(loadCustomersStart());

  fetch('http://localhost:4300/customers')
    .then((response) => response.json())
    .then((body) => {
      dispatch(loadCustomersSuccess(body))
    });
}

export const selectCustomersIndex = (state: RootState) => state.customersIndex;

export default customersIndexSlice.reducer;
