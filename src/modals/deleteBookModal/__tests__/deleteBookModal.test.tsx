import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react';

import { DeleteBookModal, DeleteBookModalProps } from '../';

const defaultProps: DeleteBookModalProps = {
    bookTitle: "Book Title",
    onCloseModal: vi.fn(),
    onDeleteBook: vi.fn(),
}

const setup = (): JSX.Element => {
    return <DeleteBookModal {...defaultProps} />;
};

describe('<DeleteBookModal />', () => {

    it('should render the defined book title', () => {
        const wrapper = render(setup());
    
        const bookTitle = wrapper.getByText(`Do you really want to delete "${defaultProps.bookTitle}"?`); 
        expect(bookTitle).toBeTruthy();
    });

    it('should call onCloseModal on click', () => {
        const wrapper = render(setup());

        const cancelButton = wrapper.getByTestId('cancel-button');
        fireEvent.click(cancelButton);

        expect(defaultProps.onCloseModal).toHaveBeenCalled();
    });

    it('should call onDeleteBook on click', () => {
        const wrapper = render(setup());

        const deleteButton = wrapper.getByTestId('delete-button');
        fireEvent.click(deleteButton);

        expect(defaultProps.onDeleteBook).toHaveBeenCalled();
    });
});