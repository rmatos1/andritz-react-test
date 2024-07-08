import { useEffect } from "react";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { IBook, PagePaths } from "@/types";
import {
    addBookOptimistic,
    changeWereBooksUpdated,
    resetUpdateError,
    updateBookOptimistic, 
} from "@/store/books";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import { useParams, useNavigate, useLocation } from "react-router-dom";

interface BookFormData {
    title: string;
    author: string;
}

interface UseManageBookHelperOutputProps {
    register: UseFormRegister<BookFormData>;
    onSubmit: () => void;
    isButtonDisabled: boolean;
    isEdit: boolean;
}

export const useManageBookHelper = (): UseManageBookHelperOutputProps => {

    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        trigger,
        formState: { isValid }
    } = useForm<BookFormData>();

    const dispatch = useAppDispatch();
    const { books, wereBooksUpdated, errorUpdateAction } = useAppSelector((state: RootState) => state.books);

    useEffect(() => {

        if (location.pathname === PagePaths.addBook) {
            reset();
        }

    }, [location.pathname, reset])

    useEffect(() => {
       
        if (id) {
            fillForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {

        if (wereBooksUpdated) {
            
            dispatch(changeWereBooksUpdated(false));
            toast.success(id ? "Book updated!" : "Book added!");
        }

    }, [dispatch, wereBooksUpdated, id])

    useEffect(() => {

        if (errorUpdateAction) {
            
            toast.error(errorUpdateAction);
            dispatch(resetUpdateError());
        }

    }, [dispatch, errorUpdateAction])

    const fillForm = async () => {

        const book = books.find(book => book.id === id);

        if (book) {
            
            setValue("title", book.title);
            setValue("author", book.author);
            await trigger();

        } else {
            navigate(PagePaths.addBook)
        }
    }

    const handleFormOnSubmit: SubmitHandler<BookFormData> = async (data) => {
        
        const book: IBook = {
            id: id || v4(),
            title: data.title,
            author: data.author,
        };

        const hasBookAlreadyAdded = books.find(item => item.title === book.title && item.author && book.author);

        if (!hasBookAlreadyAdded) {
            
            if (id) {
                await dispatch(updateBookOptimistic(book));
            } else {
    
                await dispatch(addBookOptimistic(book));
        
                reset();
            }

        } else {
            toast.error("Book is already on the list");
        }
    };

    return {
        register,
        onSubmit: handleSubmit(handleFormOnSubmit),
        isButtonDisabled: !isValid,
        isEdit: !!id
    }
}