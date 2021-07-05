import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../context/authContext";
const Navbar = () => {
  const { login, setLogin } = useAuth();
  const { name, setToken, setName } = useAuth();
  const logout = () => {
    localStorage.removeItem("login");
    setLogin(false);
    setToken(null);
    setName(null);
  };

  return (
    <div className="navbar flex jcc  aic">
      <nav className="flex aic jcsb gap-4">
        <NavLink to="/">Home</NavLink>
        {name !== null && <p>Hi, {name}</p>}
        {login && (
          <button className="btn btn-md btn-red" onClick={logout}>
            Logout
          </button>
        )}
        {!login && <NavLink to="/signin">Signin</NavLink>}
      </nav>
    </div>
  );
};

export default Navbar;
