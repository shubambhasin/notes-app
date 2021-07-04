import React, { useEffect, useState } from "react";
import "./signin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { instance } from "../../../api/axiosapi";
import { notify } from "../../../utils/notification";
import { useAuth } from "../../../context/authContext";

const Signin = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { login, setLogin} = useAuth()
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if(login){
      navigate('/')
    }
  }, [login])


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      notify("Signing in...⏳")
      const response = await instance.post("/signin", { ...user });
      console.log(response)
      if(response.data.success) {
        notify("Login successful ✅")
        localStorage.setItem('login', JSON.stringify({
          isUserLoggedIn: true,
          token: response.data.token,
          name: response.data.name
        }))
        setLogin(true)
      }
    } catch {
      // notify("Error occured 😥 !")
    }
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
