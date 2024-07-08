import { IBook } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SERVICE_URL = import.meta.env.VITE_SERVICE_URL as string;

const serviceUri = `${SERVICE_URL}/books`;

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async (signal: AbortSignal) => {
      try {

        const response = await axios.get<IBook[]>(serviceUri, {
          signal,
        });

        return response.data;

      } catch (error) {

        if (axios.isCancel(error)) {
          return [];
        }

        throw error;
      }
    }
);

export const addBookOptimistic = createAsyncThunk(
  "books/addBookOptimistic",
  async (book: IBook) => {

    const response = await axios.post<IBook>(serviceUri, book);

    return response.data;
  }
);

export const updateBookOptimistic = createAsyncThunk(
  "books/updateBookOptimistic",
  async (book: IBook) => {

    const response = await axios.put<IBook>(`${serviceUri}/${book.id}`, book);
    
    return response.data;
  }
);

export const deleteBookOptimistic = createAsyncThunk(
  "books/deleteBookOptimistic",
  async (id: string) => {
    
    await axios.delete<string>(`${serviceUri}/${id}`);

    return id;
  }
);