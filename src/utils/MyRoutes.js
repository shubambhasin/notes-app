import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home/Home";
import Signin from "../components/pages/signin/Signin";
import Signup from "../components/pages/signup/Signup";
import {ProtectedRoutes} from '../utils/ProtectedRoutes'
const MyRoutes = () => {
  return (
    <div>
      <Routes>
        <ProtectedRoutes path="/" exact element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
};

export default MyRoutes;
