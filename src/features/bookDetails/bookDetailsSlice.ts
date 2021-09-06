import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";

export interface BookDetailsStore {
  details?: BookDetails
  loading: boolean
  loaded: boolean
  editing: boolean
  error?: string
}

const initialState: BookDetailsStore = {
  loaded: false,
  loading: false,
  editing: false
}

export const bookDetailsSlice = createSlice({
  name: 'BookDetails',
  initialState,
  reducers: {
    loadBookDetailsStart(store) {
      store.loading = true
    },
    loadBookDetailsSuccess(store, action: PayloadAction<BookDetails>) {
      store.details = action.payload;

      store.loaded = true;
      store.loading = false;
    },
    loadBookDetailsFail(store, action: PayloadAction<string>) {
      store.error = action.payload;

      store.loaded = false;
      store.loading = false;
    }
  }
});

export const {
  loadBookDetailsStart,
  loadBookDetailsSuccess,
  loadBookDetailsFail
} = bookDetailsSlice.actions

export const loadBookDetails = (id: number): AppThunk => (dispatch) => {
  dispatch(loadBookDetailsStart());

  fetch(`http://localhost:4300/books/${id}?_embed=borrows`)
    .then((response) => response.json())
    .then((body) => {
      console.log(body)
      dispatch(loadBookDetailsSuccess(body))
    })
}

export const selectBookDetails = (state: RootState) => state.bookDetails;

export default bookDetailsSlice.reducer;
