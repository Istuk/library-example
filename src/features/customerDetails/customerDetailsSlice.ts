import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";

export interface CustomerDetailsStore {
  details?: CustomerDetails
  loading: boolean
  loaded: boolean
  editing: boolean
  error?: string
}

const initialState: CustomerDetailsStore = {
  loaded: false,
  loading: false,
  editing: false
}

export const customerDetailsSlice = createSlice({
  name: 'BookDetails',
  initialState,
  reducers: {
    loadCustomerDetailsStart(store) {
      store.loading = true
    },
    loadCustomerDetailsSuccess(store, action: PayloadAction<CustomerDetails>) {
      store.details = action.payload;

      store.loaded = true;
      store.loading = false;
    },
    loadCustomerDetailsFail(store, action: PayloadAction<string>) {
      store.error = action.payload;

      store.loaded = false;
      store.loading = false;
    }
  }
});

export const {
  loadCustomerDetailsStart,
  loadCustomerDetailsSuccess,
  loadCustomerDetailsFail
} = customerDetailsSlice.actions

export const loadCustomerDetails = (id: number): AppThunk => (dispatch) => {
  dispatch(loadCustomerDetailsStart());

  fetch(`http://localhost:4300/customers/${id}?_embed=borrows`)
    .then((response) => response.json())
    .then((body) => {
      dispatch(loadCustomerDetailsSuccess(body))
    })
}

export const selectCustomerDetails = (state: RootState) => state.customerDetails;

export default customerDetailsSlice.reducer;
