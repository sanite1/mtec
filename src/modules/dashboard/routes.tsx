import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/routes/AuthRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import MainLayout from "./layout/MainLayout";
import Notifications from "./pages/Notifications";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfilePage from "./components/profile/EditProfile";

export const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Protected Dashboard */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/orders" element={<></>} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Route>

      {/* Public Auth Routes */}
      <Route path="/*" element={<Auth />} />
    </Routes>
  );
};
