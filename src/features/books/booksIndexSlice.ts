import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";

export interface BooksIndexStore {
  filters: {
    yearMin?: number
    yearMax?: number
    pagesMin?: number
    pagesMax?: number
    author?: string
    title?: string
    countryId?: number
  }
  books: Book[]
  loading: boolean
  loaded: boolean
  error?: string
}

const initialState: BooksIndexStore = {
  filters: {},
  books: [],
  loaded: false,
  loading: false
}

export const booksIndexSlice = createSlice({
  name: 'BookIndex',
  initialState,
  reducers: {
    loadBooksStart(store) {
      store.loading = true;
    },
    loadBooksSuccess(store, action: PayloadAction<Book[]>) {
      store.books = action.payload;

      store.loading = false;
      store.loaded = true;
    },
    loadBooksFail(store, action) {

    }
  }
});

export const {
  loadBooksStart,
  loadBooksSuccess,
  loadBooksFail
} = booksIndexSlice.actions;

export const loadBooks = (): AppThunk => (dispatch) => {
  dispatch(loadBooksStart());

  fetch('http://localhost:4300/books')
    .then((response) => response.json())
    .then((body) => {
      dispatch(loadBooksSuccess(body))
    });
}

export const selectBooksIndex = (state: RootState) => state.booksIndex;

export default booksIndexSlice.reducer;
