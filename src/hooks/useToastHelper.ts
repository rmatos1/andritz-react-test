import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { changeWereBooksUpdated, resetUpdateError } from "@/store/books";
import { toast } from "react-toastify";

interface UseToastHelperOutputProps {
  setToastSuccessMsg: Dispatch<SetStateAction<string>>;
}

export const useToastHelper = (): UseToastHelperOutputProps => {
  const dispatch = useAppDispatch();
  const { wereBooksUpdated, errorUpdateAction } = useAppSelector(
    (state: RootState) => state.books
  );

  const [toastSuccessMsg, setToastSuccessMsg] = useState<string>("");

  useEffect(() => {
    if (wereBooksUpdated) {
      dispatch(changeWereBooksUpdated(false));
      toast.success(toastSuccessMsg);
    }
  }, [dispatch, wereBooksUpdated, toastSuccessMsg]);

  useEffect(() => {
    if (errorUpdateAction) {
      toast.error(errorUpdateAction);
      dispatch(resetUpdateError());
    }
  }, [dispatch, errorUpdateAction]);

  return {
    setToastSuccessMsg,
  };
};
