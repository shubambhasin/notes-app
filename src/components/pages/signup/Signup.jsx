import React, { useEffect, useState } from "react";
import "./signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { notify } from "../../../utils/notification";
import { instance } from "../../../api/axiosapi";
import { useAuth } from "../../../context/authContext";
import logo from "../../../assets/logo.png";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const { login, setLogin, setToken, setName } = useAuth();
  const navigate = useNavigate();
  console.log(login);
  useEffect(() => {
    if (login) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      notify("Signing up...");
      const response = await instance.post("/signup", {
        ...user,
      });
      if(response){
        if (response.data.error) {
          if(response.data.error.email)
          {
            notify(response.data.error.email)
          }
          if(response.data.error.password)
          {
            notify(response.data.error.password)
          }
        }
        if (response.data.success) {
          notify("Signed up successfully ✅");
          localStorage.setItem(
            "login",
            JSON.stringify({
              name: response.data.name,
              token: response.data.token,
              isUserLoggedIn: true,
            })
          );
          setLogin(true);
          setToken(response.data.token);
          setName(response.data.name);
          navigate("/");
        }
  
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="signup-container">
        <div className="logo-container flex aic jcc">
          {" "}
          <img src={logo} className="logo" alt="logo" />
        </div>
        {/* <div className="signup-banner"></div> */}
        <div className="form-container">
          <form className="flex flex-col gap-1" onSubmit={handleLogin}>
            <h1>Signup</h1>
            <span>
              <input
                type="text"
                placeholder="Name"
                className=""
                onChange={handleChange}
                value={user.name}
                name="name"
                required
              />
            </span>
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
                minLength="6"
                required
              />
            </span>
            <button
              onClick={() => handleLogin}
              className="btn btn-md btn-green w-100"
            >
              Signup
            </button>
            <span>
              Already have an account ? <NavLink to="/signin">Signin</NavLink>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
