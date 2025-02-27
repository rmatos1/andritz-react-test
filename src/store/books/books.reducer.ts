import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "@/types";
import {
  fetchBooks,
  addBookOptimistic,
  updateBookOptimistic,
  deleteBookOptimistic,
} from "./books.services";

export interface BooksState {
  books: IBook[];
  isLoading: boolean;
  errorFetchBooks: string | null;
  errorUpdateAction: string | null;
  wereBooksUpdated: boolean;
}

const initialState: BooksState = {
  books: [],
  isLoading: true,
  errorFetchBooks: null,
  errorUpdateAction: null,
  wereBooksUpdated: false,
};

export const BooksReducer = createSlice({
  name: "booksReducer",
  initialState,
  reducers: {
    changeWereBooksUpdated: (state, action: PayloadAction<boolean>) => {
      state.wereBooksUpdated = action.payload;
    },
    resetUpdateError: (state) => {
      state.errorUpdateAction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.errorFetchBooks = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.errorFetchBooks =
          action.error.message ?? "Failed to get book list";
      })
      .addCase(addBookOptimistic.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.wereBooksUpdated = true;
      })
      .addCase(addBookOptimistic.rejected, (state, action) => {
        state.errorUpdateAction = action.error.message ?? "Failed to add book";
      })
      .addCase(updateBookOptimistic.fulfilled, (state, action) => {
        state.books = state.books.map((book: IBook) => {
          if (book.id === action.payload.id) {
            return action.payload;
          }

          return book;
        });

        state.wereBooksUpdated = true;
      })
      .addCase(updateBookOptimistic.rejected, (state, action) => {
        state.errorUpdateAction =
          action.error.message ?? "Failed to update book";
      })
      .addCase(deleteBookOptimistic.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
        state.wereBooksUpdated = true;
      })
      .addCase(deleteBookOptimistic.rejected, (state, action) => {
        state.errorUpdateAction =
          action.error.message ?? "Failed to delete book";
      });
  },
});

export const { changeWereBooksUpdated, resetUpdateError } =
  BooksReducer.actions;
