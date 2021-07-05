import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { ToastProvider } from "./context/toastContext";
import { NoteProvider } from "./context/noteContext";
ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <NoteProvider>
        <AuthProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </AuthProvider>
      </NoteProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
