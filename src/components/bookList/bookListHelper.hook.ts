import { ChangeEvent, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { changeWereBooksUpdated, resetUpdateError } from "@/store/books";
import { IBook } from "@/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DEFAULT_BOOKS_PER_PAGE, START_PAGE } from "@/constants";

export interface BookListProps {
    books: IBook[];
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

export const useBookListHelper = (books: IBook[]): UseBookListHelperOutputProps => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { wereBooksUpdated, errorUpdateAction } = useAppSelector((state: RootState) => state.books);

    const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
    const [displayedBooks, setDisplayedBooks] = useState<IBook[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
    const [booksPerPage, setBooksPerPage] = useState<string>(DEFAULT_BOOKS_PER_PAGE);

    useEffect(() => {

        if (wereBooksUpdated) {
            
            dispatch(changeWereBooksUpdated(false));
            toast.success("Book deleted!");
        }

    }, [dispatch, wereBooksUpdated])

    useEffect(() => {

        if (books.length) {
            
            const perPage = Number(booksPerPage);

            const filteredBooks = books.filter((_, index) => index >= perPage * (currentPage - 1) && index < perPage * currentPage);

            setDisplayedBooks(filteredBooks);
        }

    }, [currentPage, books, booksPerPage]);

    useEffect(() => {

        if (errorUpdateAction) {
            
            toast.error(errorUpdateAction);
            dispatch(resetUpdateError());
        }

    }, [dispatch, errorUpdateAction])

    const handleEditBookOnClick = (id: string) => {
        navigate(`/edit-book/${id}`);
    } 

    const handleModalOnOpen = (book: IBook) => {

        setSelectedBook(book);
        setIsModalVisible(true);
    }

    const handleModalOnClose = () => {
        setIsModalVisible(false);
    }

    const handlePaginationOnClick = (page: number) => {
        setCurrentPage(page);
    }

    const handleBooksPerPageOnSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setBooksPerPage(e.target.value);
    }

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
        onSelectBooksPerPage: handleBooksPerPageOnSelect
    }
}