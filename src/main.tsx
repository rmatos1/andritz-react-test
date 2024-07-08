import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "./pages";

import "./styles.css";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>

          <ToastContainer theme="dark" autoClose={3000} />
          
          <App />

        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
