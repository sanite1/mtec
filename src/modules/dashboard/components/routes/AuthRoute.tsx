import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import ForgotPassword from "../../pages/ForgotPassword";
import VerifyEmail from "../../pages/VerifyEmail";
import ResetPassword from "../../pages/ResetPassword";
import ConfirmEmail from "../../pages/ConfirmEmail";

export const Auth: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route path="/verify/:id/:token" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
    </Routes>
  );
};

export default Auth;
