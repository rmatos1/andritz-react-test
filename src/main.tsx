import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "./pages";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastContainer theme="dark" autoClose={3000} />
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
