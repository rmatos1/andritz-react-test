import { useEffect, useCallback } from "react";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { IBook, PagePaths } from "@/types";
import { addBookOptimistic, updateBookOptimistic } from "@/store/books";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useToastHelper } from "@/hooks";

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
  const { bookId } = useParams<{ bookId?: string }>();

  const navigate = useNavigate();
  const location = useLocation();
  const { setToastSuccessMsg } = useToastHelper();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm<BookFormData>();

  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state: RootState) => state.books);

  const fillEditBook = useCallback(async () => {
    const book = books?.find((book) => book.id === bookId);

    if (book) {
      setValue("title", book.title);
      setValue("author", book.author);
      await trigger();
    } else {
      navigate(PagePaths.addBook);
    }
  }, [bookId, books, navigate, setValue, trigger]);

  useEffect(() => {
    setToastSuccessMsg(bookId ? "Book updated!" : "Book added!");

    if (location.pathname === PagePaths.addBook) {
      reset();
    } else {
      fillEditBook();
    }
  }, [bookId, location.pathname, reset, fillEditBook, setToastSuccessMsg]);

  const handleFormOnSubmit: SubmitHandler<BookFormData> = async (data) => {
    const book: IBook = {
      id: bookId || v4(),
      title: data.title,
      author: data.author,
    };

    const hasBookAlreadyAdded = books.find(
      (item) => item.title === book.title && item.author === book.author
    );

    if (!hasBookAlreadyAdded) {
      if (bookId) {
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
    isEdit: !!bookId,
  };
};
