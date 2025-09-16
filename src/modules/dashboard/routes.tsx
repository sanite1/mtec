import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/routes/AuthRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import MainLayout from "./layout/MainLayout";
import Notifications from "./pages/Notifications";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfilePage from "./components/profile/EditProfile";
import Onboarding from "./pages/Onboarding";
import StoreDetails from "./components/onboarding/StoreDetails";
import ShippingDetails from "./components/onboarding/ShippingDetails";
import ProductDetails from "./components/onboarding/ProductDetails";
import PaymentDetails from "./components/onboarding/PaymentDetails";
import ProductsPage from "./pages/Products";
import ProductDetailsPage from "./pages/ProductDetails";
import EditProduct from "./pages/EditProduct";

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
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding/store-details" element={<StoreDetails />} />
          <Route path="/onboarding/payout" element={<PaymentDetails />} />
          <Route path="/onboarding/products" element={<ProductDetails />} />
          <Route path="/onboarding/shipping" element={<ShippingDetails />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
        </Route>
      </Route>

      {/* Public Auth Routes */}
      <Route path="/*" element={<Auth />} />
    </Routes>
  );
};
