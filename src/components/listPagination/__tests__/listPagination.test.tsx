import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { DEFAULT_BOOKS_PER_PAGE } from "@/constants";
import { ListPagination, ListPaginationProps } from "../";

const defaultProps: ListPaginationProps = {
  booksLength: 10,
  currentPage: 1,
  onPagination: vi.fn(),
  booksPerPage: DEFAULT_BOOKS_PER_PAGE,
  onSelectBooksPerPage: vi.fn(),
};

const LAST_PAGE = Math.ceil(
  defaultProps.booksLength / Number(DEFAULT_BOOKS_PER_PAGE)
);

const setup = (componentProps?: Partial<ListPaginationProps>): JSX.Element => {
  const baseProps = { ...defaultProps, ...componentProps };

  return <ListPagination {...baseProps} />;
};

describe("<ListPagination />", () => {
  it("should previous button be disabled on start page", () => {
    const wrapper = render(setup());

    const prevButton = wrapper.getByTestId("prev-button");
    expect(prevButton).toHaveProperty("disabled", true);
  });

  it("should next button be disabled on last page", () => {
    const wrapper = render(setup({ currentPage: LAST_PAGE }));

    const nextButton = wrapper.getByTestId("next-button");
    expect(nextButton).toHaveProperty("disabled", true);
  });

  it("should call onPagination when button is clicked", async () => {
    let currentPage = defaultProps.currentPage;

    const onPaginationMock = (page: number) => {
      currentPage = page;
    };

    const wrapper = render(setup({ onPagination: onPaginationMock }));

    const nextButton = wrapper.getByTestId("next-button");

    fireEvent.click(nextButton);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(currentPage).toBe(defaultProps.currentPage + 1);
  });

  it("should display the current page and the number of total pages", () => {
    const wrapper = render(setup());

    const pageIndicator = wrapper.getByTestId("page-indicator");

    expect(pageIndicator.textContent).toMatch(
      `${defaultProps.currentPage} / ${LAST_PAGE}`
    );
  });

  it("should display correctly the selected number of books per page", () => {
    const wrapper = render(setup());

    const selectBooksPerPage = wrapper.getByTestId(
      "select-books-per-page"
    ) as HTMLSelectElement;

    expect(selectBooksPerPage.value).toEqual(DEFAULT_BOOKS_PER_PAGE);
  });

  it("should call onSelectBooksPerPage on select", async () => {
    let booksPerPage = DEFAULT_BOOKS_PER_PAGE;

    const onSelectBooksPerPageMock = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      booksPerPage = e.target.value;
    };

    const wrapper = render(
      setup({ onSelectBooksPerPage: onSelectBooksPerPageMock })
    );

    const updatedBooksPerPage = "10";

    const selectBooksPerPage = wrapper.getByTestId(
      "select-books-per-page"
    ) as HTMLSelectElement;

    fireEvent.change(selectBooksPerPage, {
      target: { value: updatedBooksPerPage },
    });

    expect(booksPerPage).toEqual(updatedBooksPerPage);
  });
});
