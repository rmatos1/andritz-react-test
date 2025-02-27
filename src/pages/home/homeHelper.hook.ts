import { useState, useEffect, ChangeEvent, useMemo, useCallback } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { IBook } from "@/types";
import { fetchBooks } from "@/store/books";
import { sortBooksByTitle } from "@/helpers";

interface UseHomeHelperOutputProps {
  isLoading: boolean;
  displayedBooks: IBook[];
  searchValue: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  getBooks: () => void;
  totalBooks: number;
}

export const useHomeHelper = (): UseHomeHelperOutputProps => {
  const dispatch = useAppDispatch();
  const { books, errorFetchBooks, isLoading } = useAppSelector(
    (state: RootState) => state.books
  );

  const [searchValue, setSearchValue] = useState<string>("");

  const displayedBooks: IBook[] = useMemo(() => {
    if (!searchValue) {
      return sortBooksByTitle([...books]);
    }

    const filteredBooks = books.filter((book: IBook) => {
      const formattedTitle = book.title.toLowerCase();
      const formattedAuthor = book.author.toLowerCase();
      const formattedValue = searchValue.toLowerCase();

      if (
        formattedTitle.match(formattedValue) ||
        formattedAuthor.match(formattedValue)
      ) {
        return book;
      }
    });

    return sortBooksByTitle(filteredBooks);
  }, [books, searchValue]);

  const getBooks = useCallback(async () => {
    const abortController = new AbortController();

    await dispatch(fetchBooks(abortController.signal));

    abortController.abort();
  }, [dispatch]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const handleSearchValueOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return {
    isLoading,
    displayedBooks,
    searchValue,
    onChangeValue: handleSearchValueOnChange,
    error: errorFetchBooks,
    getBooks,
    totalBooks: books.length,
  };
};
