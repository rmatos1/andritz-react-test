import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { changeWereBooksUpdated, deleteBookOptimistic, resetUpdateError } from "@/store/books";
import { IBook } from "@/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BOOKS_PER_PAGE, START_PAGE } from "@/constants";

export interface BookListProps {
    books: IBook[];
}

interface UseBookListHelperOutputProps {
    onEditBook: (id: string) => void;
    onDeleteBook: () => void;
    displayedBooks: IBook[];
    currentPage: number;
    onClickPagination: (page: number) => void;
    selectedBook: IBook | null;
    isModalVisible: boolean;
    onOpenModal: (book: IBook) => void;
    onCloseModal: () => void;
}

export const useBookListHelper = (books: IBook[]): UseBookListHelperOutputProps => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { wereBooksUpdated, errorUpdateAction } = useAppSelector((state: RootState) => state.books);

    const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
    const [displayedBooks, setDisplayedBooks] = useState<IBook[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

    useEffect(() => {

        if (wereBooksUpdated) {
            
            dispatch(changeWereBooksUpdated(false));
            toast.success("Book deleted!");
        }

    }, [dispatch, wereBooksUpdated])

    useEffect(() => {

        if (books.length) {
            
            const filteredBooks = books.filter((_, index) => index >= BOOKS_PER_PAGE * (currentPage - 1) && index < BOOKS_PER_PAGE * currentPage);

            setDisplayedBooks(filteredBooks);
        }

    }, [currentPage, books]);

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

    const handleDeleteBookOnClick = async () => {

        handleModalOnClose();

        await dispatch(deleteBookOptimistic(selectedBook?.id || ""));
    }

    const handlePaginationOnClick = (page: number) => {
        setCurrentPage(page);
    }

    return {
        onEditBook: handleEditBookOnClick,
        onDeleteBook: handleDeleteBookOnClick,
        displayedBooks,
        currentPage,
        onClickPagination: handlePaginationOnClick,
        selectedBook,
        isModalVisible,
        onOpenModal: handleModalOnOpen,
        onCloseModal: handleModalOnClose
    }
}