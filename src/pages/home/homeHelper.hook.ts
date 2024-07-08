import { useState, useEffect, ChangeEvent } from "react";
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
}

export const useHomeHelper = (): UseHomeHelperOutputProps => {

    const dispatch = useAppDispatch();
    const { books, errorFetchBooks, isLoading } = useAppSelector((state: RootState) => state.books);

    const [displayedBooks, setDisplayedBooks] = useState<IBook[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        getBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateFilteredBooks(books);
    }, [books])

    useEffect(() => {
        handleFilterBookOnChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, books])

    const getBooks = async () => {
        const abortController = new AbortController();

        await dispatch(fetchBooks(abortController.signal));

        abortController.abort();
    }

    const handleSearchValueOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const updateFilteredBooks = (books: IBook[]) => {
        setDisplayedBooks(sortBooksByTitle([...books]));
    }

    const handleFilterBookOnChange = () => {

        if (searchValue.length) {
            
            const filteredBooks = books.filter((book: IBook) => {
    
                const formattedTitle = book.title.toLowerCase();
                const formattedAuthor = book.author.toLowerCase();
                const formattedValue = searchValue.toLowerCase();
    
                if (formattedTitle.match(formattedValue) || formattedAuthor.match(formattedValue)) {
                    return book;
                }
            })
    
            updateFilteredBooks(filteredBooks);

        } else {
            updateFilteredBooks(books)
        }
    }

    return {
        isLoading,
        displayedBooks,
        searchValue,
        onChangeValue: handleSearchValueOnChange,
        error: errorFetchBooks,
        getBooks
    }
}