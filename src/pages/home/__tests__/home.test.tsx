import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { EnhancedStore, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Home } from "..";
import { ManageBook } from "@/pages/manageBook";
import { BooksReducer, BooksState } from "@/store/books";
import { defaultState, testBooks } from "@/constants";

vi.mock("@/store/books", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    fetchBooks: vi.fn(() => ({
      type: "books/fetchBooks",
      payload: testBooks,
    })),
  };
});

const setup = (customState?: Partial<BooksState>): JSX.Element => {
  const store: EnhancedStore<unknown, UnknownAction> = configureStore({
    reducer: {
      books: BooksReducer.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState: {
      books: { ...defaultState, ...customState },
    },
  });

  return (
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="/add-book" element={<ManageBook />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe("<Home />", () => {
  it("should render the loading indicator", () => {
    const wrapper = render(setup({ isLoading: true }));

    const loadingIndicators = wrapper.getAllByTestId("loading-indicator");

    expect(loadingIndicators.length).toBeGreaterThan(0);
  });

  it("should navigate to the add book page when the 'Add Book' button is clicked", () => {
    const wrapper = render(setup());

    const addBookButton = wrapper.getByTestId("add-book-button");
    fireEvent.click(addBookButton);

    const addBookTitle = wrapper.getByText("Add Book");

    expect(addBookTitle).toBeInTheDocument();
  });

  it("should render correctly the number of books", async () => {
    const wrapper = render(setup());

    await waitFor(() => {
      const bookCards = wrapper.queryAllByTestId("book-card");

      expect(bookCards.length).toEqual(testBooks.length);
    });
  });

  it("should render the specified value", () => {
    const value = "test";

    const wrapper = render(setup());

    const searchInput = wrapper.getByTestId("search-input") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value } });

    expect(searchInput.value).toEqual(value);
  });

  it("should filter books correctly", async () => {
    const wrapper = render(setup());

    const searchInput = wrapper.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: testBooks[0].title } });

    await waitFor(() => {
      const filteredBooks = wrapper.getAllByTestId("book-card");

      expect(filteredBooks[0]).toHaveTextContent(testBooks[0].title);
    });

    fireEvent.change(searchInput, { target: { value: "Book test" } });

    await waitFor(() => {
      const noBooksResult = wrapper.getByTestId("no-books-result");

      expect(noBooksResult).toBeInTheDocument();
    });
  });

  it("should render the defined error on fetch error", async () => {
    const error = "Failed to get book list";

    const wrapper = render(setup({ errorFetchBooks: error }));

    const errorFetchBooks = await wrapper.findByTestId("error-fetch-books");

    expect(errorFetchBooks.textContent).toMatch(error);
  });

  it("should display empty book list message when there are no books in the list", () => {
    const wrapper = render(setup({ books: [] }));

    const emptyBookList = wrapper.getByTestId("empty-book-list");

    expect(emptyBookList).toBeDefined();
  });
});
