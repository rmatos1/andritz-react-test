import { configureStore } from "@reduxjs/toolkit";
import { BooksReducer } from "./books";

export const store = configureStore({
    reducer: {
        books: BooksReducer.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;