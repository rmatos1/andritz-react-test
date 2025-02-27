import { ChangeEvent, useEffect, useState, useMemo, useCallback } from "react";
import { IBook } from "@/types";
import { useNavigate } from "react-router-dom";
import { DEFAULT_BOOKS_PER_PAGE, START_PAGE } from "@/constants";
import { useToastHelper } from "@/hooks";

export interface BookListProps {
  books: IBook[];
  totalBooks?: number;
}

interface UseBookListHelperOutputProps {
  onEditBook: (id: string) => void;
  displayedBooks: IBook[];
  currentPage: number;
  onClickPagination: (page: number) => void;
  selectedBook: IBook | null;
  isModalVisible: boolean;
  onOpenModal: (book: IBook) => void;
  onCloseModal: () => void;
  booksPerPage: string;
  onSelectBooksPerPage: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const useBookListHelper = (
  books: IBook[]
): UseBookListHelperOutputProps => {
  const navigate = useNavigate();
  const { setToastSuccessMsg } = useToastHelper();

  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [booksPerPage, setBooksPerPage] = useState<string>(
    DEFAULT_BOOKS_PER_PAGE
  );

  const displayedBooks: IBook[] = useMemo(() => {
    if (!books.length) {
      return [];
    }

    const perPage = Number(booksPerPage);

    const filteredBooks = books.filter(
      (_, index) =>
        index >= perPage * (currentPage - 1) && index < perPage * currentPage
    );

    return filteredBooks;
  }, [currentPage, books, booksPerPage]);

  useEffect(() => {
    setToastSuccessMsg("Book deleted!");
  }, [setToastSuccessMsg]);

  const handleEditBookOnClick = (bookId: string) => {
    navigate(`/edit-book/${bookId}`);
  };

  const handleModalOnOpen = (book: IBook) => {
    setSelectedBook(book);
    setIsModalVisible(true);
  };

  const handleModalOnClose = () => {
    setIsModalVisible(false);
  };

  const handlePaginationOnClick = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleBooksPerPageOnSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setBooksPerPage(e.target.value);
    },
    []
  );

  return {
    onEditBook: handleEditBookOnClick,
    displayedBooks,
    currentPage,
    onClickPagination: handlePaginationOnClick,
    selectedBook,
    isModalVisible,
    onOpenModal: handleModalOnOpen,
    onCloseModal: handleModalOnClose,
    booksPerPage,
    onSelectBooksPerPage: handleBooksPerPageOnSelect,
  };
};
