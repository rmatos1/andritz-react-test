import { describe, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import { Provider } from "react-redux";
import { EnhancedStore, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { BookList } from '../';
import { BookListProps } from '../bookListHelper.hook';
import { BooksReducer, BooksState } from '@/store/books';
import { defaultState, testBooks } from '@/constants';
import { DEFAULT_BOOKS_PER_PAGE } from '@/constants';

const defaultProps: BookListProps = {
    books: testBooks
}

interface ISetup {
    componentProps?: Partial<BookListProps>;
    customState?: Partial<BooksState>;
}

const setup = ({ componentProps, customState }: ISetup): JSX.Element => {
    const store: EnhancedStore<unknown, UnknownAction> = configureStore({
        reducer: {
          books: BooksReducer.reducer,
        },
        preloadedState: {
            books: { ...defaultState, ...customState }
        },
    });

    const baseProps = { ...defaultProps, ...componentProps };

    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<BookList {...baseProps} />} />
                    <Route path="/edit-book/:id" element={<div data-testid="edit-page" />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
};

describe('<BookList />', () => {
    it("should render correctly", () => {
        const wrapper = render(setup({}));
    
        const book1 = wrapper.getByText(defaultProps.books[0].title);

        expect(book1).toBeTruthy();
        
        const book2 = wrapper.getByText(defaultProps.books[1].title);

        expect(book2).toBeTruthy();
      });
    

    it('should render correctly the number of books', () => {
        const wrapper = render(setup({}));
  
        const bookCards = wrapper.getAllByTestId("book-card");
        
        expect(bookCards.length).toEqual(defaultProps.books.length)
    });

    it("should render no books result", () => {
        const wrapper = render(setup({ componentProps: { books: [] } }));

        const noBooksResult = wrapper.getByTestId("no-books-result");

        expect(noBooksResult).toBeDefined();
    })

    it("should navigate to edit the selected book on click", async () => {
        const wrapper = render(setup({}));

        const editButtons = wrapper.getAllByTestId("edit-button");

        fireEvent.click(editButtons[0]);
        
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(wrapper.getByTestId('edit-page')).toBeTruthy();
    });

    it("should open modal to delete the book on click", async () => {
        const wrapper = render(setup({}));

        const deleteButtons = wrapper.getAllByTestId("delete-button");

        fireEvent.click(deleteButtons[0]);
        
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(wrapper.getByTestId('delete-book-modal')).toBeDefined();
    });

    it('should display the correct number of books per page when modified', () => {
        const wrapper = render(setup({
            componentProps: {
                books: Array.from({ length: 10 }).map((_, index) => ({
                    id: String(index),
                    title: `Book ${index}`,
                    author: `Author ${index}`
                }))
            }
        }));
        
        const selectElement = wrapper.getByTestId('select-books-per-page');
        
        fireEvent.change(selectElement, { target: { value: DEFAULT_BOOKS_PER_PAGE } });
        
        const displayedBooks = wrapper.getAllByTestId('book-card');
        expect(displayedBooks.length).toEqual(Number(DEFAULT_BOOKS_PER_PAGE));
        
        const newValue = "10";

        fireEvent.change(selectElement, { target: { value: newValue } });

        const updatedDisplayedBooks = wrapper.getAllByTestId('book-card');
        expect(updatedDisplayedBooks.length).toEqual(Number(newValue));
    });
});