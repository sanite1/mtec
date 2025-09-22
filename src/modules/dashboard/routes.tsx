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
import CreateProduct from "./components/products/CreateProduct";
import Orders from "./pages/Orders";
import CreateOrder from "./components/orders/CreateOrder";
import Customers from "./pages/Customers";
import CreateCustomer from "./components/customers/CreateCustomer";
import Shipping from "./pages/Shipping";
import AutomatedShipping from "./pages/AutomatedShipping";
import Payments from "./pages/Payments";
import PaymentMethods from "./pages/PaymentMethods";
import Taxes from "./pages/Taxes";
import Marketing from "./pages/Marketing";
import BillingPage from "./pages/Billing";
import Domain from "./pages/Domain";
import BuyDomain from "./components/domain/BuyDomain";
import ConnectDomain from "./components/domain/ConnectDomain";

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
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/create" element={<CreateOrder />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/create" element={<CreateCustomer />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/shipping/automated" element={<AutomatedShipping />} />
          <Route path="/payments" element={<Payments />} />
          <Route
            path="/payments/payment-methods"
            element={<PaymentMethods />}
          />
          <Route path="/taxes" element={<Taxes />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/domain" element={<Domain />} />
          <Route path="/domain/buy" element={<BuyDomain />} />
          <Route path="/domain/connect" element={<ConnectDomain />} />
        </Route>
      </Route>

      {/* Public Auth Routes */}
      <Route path="/*" element={<Auth />} />
    </Routes>
  );
};
