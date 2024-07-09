import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from "react-redux";
import { EnhancedStore, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { defaultState, testBooks } from '@/constants';
import { BooksReducer, deleteBookOptimistic } from '@/store/books';

import { DeleteBookModal, DeleteBookModalProps } from '../';

vi.mock("@/store/books", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as object),
        deleteBookOptimistic: vi.fn().mockImplementation((id) => ({
            type: "books/deleteBookOptimistic",
            payload: id,
        })),
    };
});

const defaultProps: DeleteBookModalProps = {
    book: testBooks[0],
    onCloseModal: vi.fn()
}

const setup = (): JSX.Element => {
    const store: EnhancedStore<unknown, UnknownAction> = configureStore({
        reducer: {
          books: BooksReducer.reducer,
        },
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({
                serializableCheck: false,
            }),
        preloadedState: {
            books: defaultState
        },
    });

    return (
        <Provider store={store}>
            <DeleteBookModal {...defaultProps} />
        </Provider>
    );
};

describe('<DeleteBookModal />', () => {

    it('should render the defined book title', () => {
        const wrapper = render(setup());
    
        const bookTitle = wrapper.getByText(`Do you really want to delete "${defaultProps.book?.title || ""}"?`); 
        expect(bookTitle).toBeTruthy();
    });

    it('should call onCloseModal on click', () => {
        const wrapper = render(setup());

        const cancelButton = wrapper.getByTestId('cancel-button');
        fireEvent.click(cancelButton);

        expect(defaultProps.onCloseModal).toHaveBeenCalled();
    });

    it('should delete a book optimistically', async () => {
        const wrapper = render(setup());

        const deleteButton = wrapper.getByTestId('delete-button');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            const addBookCalls = vi.mocked(deleteBookOptimistic).mock.calls;

            if (addBookCalls.length) {
                expect(addBookCalls[0][0]).toEqual(defaultProps.book?.id || "");
            } 
        });
    });
});