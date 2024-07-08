import { BooksState } from "@/store/books";
import { IBook } from "@/types";

export const testBooks: IBook[] = [
    {
        id: "1",
        title: "Book 1",
        author: "Author 1",
    },
    {
        id: "2",
        title: "Book 2",
        author: "Author 2",
    },
];

export const defaultState: BooksState = {
    books: testBooks,
    isLoading: false,
    errorFetchBooks: null,
    errorUpdateAction: null,
    wereBooksUpdated: false
}