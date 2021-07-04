import React from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userinfo = JSON.parse(localStorage?.getItem("login")) || {
    isUserLoggedIn: false,
    name: null,
    token: null,
  };

  console.log(userinfo);

  const [login, setLogin] = useState(userinfo.isUserLoggedIn);
  const [loader, setLoader] = useState(false);
  const [token, setToken] = useState(userinfo.token);
  return (
    <>
      <AuthContext.Provider
        value={{ login, setLogin, loader, setLoader, token, setToken }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
