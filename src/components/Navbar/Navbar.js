import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">home</NavLink>
        <NavLink to="/signup">signup</NavLink>
        <NavLink to="/signin">signin</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
