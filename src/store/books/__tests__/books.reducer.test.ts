import { describe, expect, it } from 'vitest'
import { BooksReducer, BooksState, changeWereBooksUpdated, resetUpdateError } from '../books.reducer';
import { IBook } from '@/types';
import { fetchBooks, addBookOptimistic, updateBookOptimistic, deleteBookOptimistic } from '../books.services';
import { defaultState, testBooks } from '@/constants';

describe('BooksReducer', () => {
  it('should handle fetchBooks.pending', () => {
        const state = BooksReducer.reducer(undefined, fetchBooks.pending());
      
        expect(state.isLoading).toBe(true);
        expect(state.errorFetchBooks).toBe(null);
  });

  it('should handle fetchBooks.fulfilled', () => {
        const books: IBook[] = [testBooks[0]];
        const state = BooksReducer.reducer(undefined, fetchBooks.fulfilled(books));
      
        expect(state.isLoading).toBe(false);
        expect(state.books).toEqual(books);
  });

  it('should handle fetchBooks.rejected', () => {
        const error = new Error('Failed to fetch books');
        const state = BooksReducer.reducer(undefined, fetchBooks.rejected(error));
      
        expect(state.isLoading).toBe(false);
        expect(state.errorFetchBooks).toBe('Failed to fetch books');
  });

  it('should handle addBookOptimistic.fulfilled', () => {
        const book: IBook = testBooks[0];
        const state = BooksReducer.reducer(undefined, addBookOptimistic.fulfilled(book));
      
        expect(state.books).toContainEqual(book);
        expect(state.wereBooksUpdated).toBe(true);
  });

  it('should handle addBookOptimistic.rejected', () => {
        const error = new Error('Failed to add book');
        const state = BooksReducer.reducer(undefined, addBookOptimistic.rejected(error));
      
        expect(state.errorUpdateAction).toBe('Failed to add book');
  });

  it('should handle updateBookOptimistic.fulfilled', () => {
        const updatedBook: IBook = { id: '1', title: 'Updated Book 1', author: 'Updated Author 1' };
        const state = BooksReducer.reducer(defaultState, updateBookOptimistic.fulfilled(updatedBook));
      
        expect(state.books).toContainEqual(updatedBook);
        expect(state.wereBooksUpdated).toBe(true);
  });

  it('should handle updateBookOptimistic.rejected', () => {
        const error = new Error('Failed to update book');
        const state = BooksReducer.reducer(undefined, updateBookOptimistic.rejected(error));
    
        expect(state.errorUpdateAction).toBe('Failed to update book');
  });

  it('should handle deleteBookOptimistic.fulfilled', () => {
        const id = '1';
        const state = BooksReducer.reducer(defaultState, deleteBookOptimistic.fulfilled(id));
      
        expect(state.books).not.toContainEqual(expect.objectContaining({ id }));
        expect(state.wereBooksUpdated).toBe(true);
  });

  it('should handle deleteBookOptimistic.rejected', () => {
        const error = new Error('Failed to delete book');
        const state = BooksReducer.reducer(undefined, deleteBookOptimistic.rejected(error));
      
        expect(state.errorUpdateAction).toBe('Failed to delete book');
  });

  it('should handle changeWereBooksUpdated', () => {
        const state = BooksReducer.reducer(undefined, changeWereBooksUpdated(true));
      
        expect(state.wereBooksUpdated).toBe(true);
  });

  it('should handle resetUpdateError', () => {
        const state: BooksState = {
            ...defaultState,
            errorUpdateAction: 'Failed to update book',
        };
        const updatedState = BooksReducer.reducer(state, resetUpdateError());
      
        expect(updatedState.errorUpdateAction).toBe(null);
  });
});
