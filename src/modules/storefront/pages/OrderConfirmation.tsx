import React, { useEffect } from "react";
import OrderSummary from "../components/orderConfirmation/OrderSummary";
import OrderHero from "../components/orderConfirmation/OrderHero";

export default function OrderConfirmation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-gray-100">
      {/* <OrderHero /> */}

      <OrderSummary />
    </div>
  );
}
