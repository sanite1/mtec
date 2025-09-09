import React, { useEffect } from "react";
import CheckoutHero from "../components/checkout/CheckoutHero";
import CheckoutSection from "../components/checkout/CheckoutSection";

export default function Checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <CheckoutHero />

      <CheckoutSection />
    </div>
  );
}
