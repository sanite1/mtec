import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/Mainlayout";
import Home from "./pages/Home";

export const StorefrontRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Routes that share the Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Routes without Navbar (e.g., login/register) */}
      {/* <Route path="/*" element={<Auth />} /> */}
    </Routes>
  );
};
