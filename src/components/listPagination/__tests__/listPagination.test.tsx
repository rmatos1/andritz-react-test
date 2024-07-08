import { describe, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/react';
import { BOOKS_PER_PAGE } from '@/constants';
import { ListPagination, ListPaginationProps } from '../';

const defaultProps: ListPaginationProps = {
    booksLength: 10,
    currentPage: 1,
    onPagination: () => {}
};
  
const LAST_PAGE = Math.ceil(defaultProps.booksLength / BOOKS_PER_PAGE);

const setup = (componentProps?: Partial<ListPaginationProps>): JSX.Element => {
    const baseProps = { ...defaultProps, ...componentProps };
  
    return <ListPagination {...baseProps} />;
};

describe('<ListPagination />', () => {

    it('should previous button be disabled on start page', () => {
        const wrapper = render(setup());
    
        const prevButton = wrapper.getByTestId('prev-button'); 
        expect(prevButton).toHaveProperty('disabled', true);
    });

    it('should next button be disabled on last page', () => {

        const wrapper = render(
            setup({ currentPage: LAST_PAGE })
        );

        const nextButton = wrapper.getByTestId('next-button'); 
        expect(nextButton).toHaveProperty('disabled', true);
    });

    it('should call onPagination when button is clicked', async () => {
        let currentPage = defaultProps.currentPage;

        const onPaginationMock = (page: number) => {
          currentPage = page;
        };
      
        const wrapper = render(setup({ onPagination: onPaginationMock }));
        
        const nextButton = wrapper.getByTestId('next-button');
      
        fireEvent.click(nextButton);
      
        await new Promise(resolve => setTimeout(resolve, 0));
      
        expect(currentPage).toBe(defaultProps.currentPage + 1);
    });

    it("should display the current page and the number of total pages", () => {

        const wrapper = render(setup());

        const pageIndicator = wrapper.getByTestId('page-indicator');

        expect(pageIndicator.textContent).toMatch(`${defaultProps.currentPage} / ${LAST_PAGE}`);
    })
});
  