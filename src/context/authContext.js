import React from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userinfo = JSON.parse(localStorage?.getItem("login")) || {
    isUserLoggedIn: false,
    name: null,
    token: null,
  };
  const [login, setLogin] = useState(userinfo.isUserLoggedIn);
  const [loader, setLoader] = useState(false);
  const [token, setToken] = useState(userinfo.token);
  const [name, setName] = useState(userinfo.name);
  return (
    <>
      <AuthContext.Provider
        value={{ login, setLogin, loader, setLoader, token, setToken, name, setName }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
