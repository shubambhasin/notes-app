import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../context/authContext";
const Navbar = () => {
  const { login, setLogin } = useAuth();
  const logout = () => {
    localStorage.removeItem("login");
    setLogin(false)

  };

  return (

    <div className="navbar flex jcc  aic">
      <nav className="flex aic gap-4">
        <NavLink to="/">Home</NavLink>
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
