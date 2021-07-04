import React, { useState } from "react";
import "./signin.css";
import { NavLink } from "react-router-dom";
const Signin = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(user)
  };

  return (
    <div>
      <div className="signin-container">
        {/* <div className="signin-banner"></div> */}
        <div className="form-container">
          <form className="flex flex-col gap-1" onSubmit={handleLogin}>
            <h1>Signin</h1>
            <span>
              <input
                type="email"
                placeholder="Email"
                className=""
                onChange={handleChange}
                value={user.email}
                name="email"
                required
              />
            </span>
            <span>
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
                name="password"
                required
              />
            </span>
            <button
              onClick={() => handleLogin}
              className="btn btn-md btn-green w-100"
            >
              Signin
            </button>
            <span>
              Don't have an account ? <NavLink to="/signup">Signup</NavLink>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
