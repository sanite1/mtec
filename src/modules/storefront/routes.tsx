import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/Mainlayout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import OrderConfirmation from "./pages/OrderConfirmation";
import { CartProvider } from "./context/CartContext";

export const StorefrontRoutes: React.FC = () => {
  return (
    <CartProvider>
      <Routes>
        {/* Routes that share the Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* Routes without Navbar (e.g., login/register) */}
        {/* <Route path="/*" element={<Auth />} /> */}
      </Routes>
    </CartProvider>
  );
};
