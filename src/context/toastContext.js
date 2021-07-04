import React from "react";
import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <>
      <ToastContext.Provider value={{ loader, setLoader, modal, setModal }}>
        {children}
      </ToastContext.Provider>
    </>
  );
};

export const useToast = () => useContext(ToastContext);
