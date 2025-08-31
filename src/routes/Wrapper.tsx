import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../components/routes/AuthRouter";
import Home from "../pages/Home";
import MainLayout from "../shared/layouts/MainLayout";
import About from "../components/About";
import TermsOfServicePage from "../pages/TermsOfService";

export const RoutesWrapper: React.FC = () => {
  return (
    <Routes>
      {/* Routes that share the Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
      </Route>

      {/* Routes without Navbar (e.g., login/register) */}
      <Route path="/*" element={<Auth />} />
    </Routes>
  );
};
