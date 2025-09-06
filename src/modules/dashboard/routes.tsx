import React from "react";
import { Routes, Route } from "react-router-dom";

export const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Routes that share the Navbar */}
      {/* <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route> */}

      {/* Routes without Navbar (e.g., login/register) */}
      {/* <Route path="/*" element={<Auth />} /> */}
    </Routes>
  );
};
