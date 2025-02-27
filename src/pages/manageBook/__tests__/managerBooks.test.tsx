import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { EnhancedStore, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ManageBook } from "..";
import {
  addBookOptimistic,
  BooksReducer,
  BooksState,
  updateBookOptimistic,
} from "@/store/books";
import { defaultState, testBooks } from "@/constants";
import { ToastContainer } from "react-toastify";

vi.mock("@/store/books", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    addBookOptimistic: vi.fn().mockImplementation((book) => ({
      type: "books/addBookOptimistic",
      payload: book,
    })),
    updateBookOptimistic: vi.fn().mockImplementation((book) => ({
      type: "books/updateBookOptimistic",
      payload: book,
    })),
  };
});

interface ISetup {
  customState?: Partial<BooksState>;
  path?: string;
}

const setup = ({ customState, path = "/" }: ISetup = {}): JSX.Element => {
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
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/:bookId" element={<ManageBook />} />
          <Route path="/" element={<ManageBook />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe("<ManageBook />", () => {
  it("should render the specified title and author", () => {
    const wrapper = render(setup());

    const titleInput = wrapper.getByTestId("title-input") as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: testBooks[0].title } });

    expect(titleInput.value).toEqual(testBooks[0].title);

    const authorInput = wrapper.getByTestId("author-input") as HTMLInputElement;
    fireEvent.change(authorInput, { target: { value: testBooks[0].author } });

    expect(authorInput.value).toEqual(testBooks[0].author);
  });

  it("should render the saved title and author accordingly with book id", async () => {
    const wrapper = render(setup({ path: "/1" }));

    await waitFor(() => {
      const titleInput = wrapper.getByTestId("title-input") as HTMLInputElement;
      expect(titleInput.value).toEqual(testBooks[0].title);

      const authorInput = wrapper.getByTestId(
        "author-input"
      ) as HTMLInputElement;
      expect(authorInput.value).toEqual(testBooks[0].author);
    });
  });

  it("should add a book optimistically", async () => {
    const title = "Book 3";
    const author = "Author 3";

    const wrapper = render(setup());

    const titleInput = wrapper.getByTestId("title-input") as HTMLInputElement;
    const authorInput = wrapper.getByTestId("author-input") as HTMLInputElement;
    const submitButton = wrapper.getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: title } });
    fireEvent.change(authorInput, { target: { value: author } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const addBookCalls = vi.mocked(addBookOptimistic).mock.calls;

      if (addBookCalls.length) {
        expect(addBookCalls[0][0]).toEqual({ title, author });
      }
    });
  });

  it("should call updateBookOptimistic on submit", async () => {
    const title = "Updated Book 1";
    const author = "Updated Author 1";
    const id = "1";

    const wrapper = render(setup({ path: `/${id}` }));

    const titleInput = wrapper.getByTestId("title-input") as HTMLInputElement;
    const authorInput = wrapper.getByTestId("author-input") as HTMLInputElement;
    const submitButton = wrapper.getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: title } });
    fireEvent.change(authorInput, { target: { value: author } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const updateBookCalls = vi.mocked(updateBookOptimistic).mock.calls;

      if (updateBookCalls.length) {
        expect(updateBookCalls[0][0]).toEqual({
          id,
          title,
          author,
        });
      }
    });
  });

  it("should show a toast whenever adding a duplicate book", async () => {
    const wrapper = render(
      <>
        {setup()}
        <ToastContainer theme="dark" autoClose={3000} />
      </>
    );

    fireEvent.change(wrapper.getByTestId("title-input"), {
      target: { value: testBooks[0].title },
    });
    fireEvent.change(wrapper.getByTestId("author-input"), {
      target: { value: testBooks[0].author },
    });
    fireEvent.click(wrapper.getByTestId("submit-button"));

    await waitFor(() => {
      const toast = document.querySelector(".Toastify");
      expect(toast).toBeInTheDocument();
    });
  });
});
