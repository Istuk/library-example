import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";

export interface CountriesStore {
  countries?: Country[]
  loading: boolean
  loaded: boolean
  error?: string
}

const initialState: CountriesStore = {
  loaded: false,
  loading: false
}

export const countriesSlice = createSlice({
  name: 'Countries',
  initialState,
  reducers: {
    loadCountriesStart(store) {
      store.loading = true
    },
    loadCountriesSuccess(store, action: PayloadAction<Country[]>) {
      store.countries = action.payload;

      store.loaded = true;
      store.loading = false;
    },
    loadCountriesFail(store, action: PayloadAction<string>) {
      store.error = action.payload;

      store.loaded = false;
      store.loading = false;
    }
  }
});

export const {
  loadCountriesStart,
  loadCountriesSuccess,
  loadCountriesFail
} = countriesSlice.actions

export const loadCountries = (): AppThunk => (dispatch) => {
  dispatch(loadCountriesStart());

  fetch(`http://localhost:4300/countries`)
    .then((response) => response.json())
    .then((body) => {
      dispatch(loadCountriesSuccess(body))
    })
}

export const selectCountries = (state: RootState) => state.countries;

export default countriesSlice.reducer;
