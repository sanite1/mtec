import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";

export const Auth: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Auth;
