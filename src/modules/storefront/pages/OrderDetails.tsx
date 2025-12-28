import React, { useEffect } from "react";
import OrderHero from "../components/orderDetails/OrderHero";
import OrderDetails from "../components/orderDetails/OrderDetails";

export default function OrderDetailsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-gray-100">
      <OrderHero />

      <OrderDetails />
    </div>
  );
}
