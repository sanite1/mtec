import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../components/routes/AuthRouter";
import Home from "../components/Home";

export const RoutesWrapper: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<Auth />} />
      {/* <Route element={<MainLayout />}>
    <Route element={<AdminGuard />}>
      <Route path="/admin/*" element={<AdminRouter />} />
    </Route>
  </Route> */}
    </Routes>
  );
};
