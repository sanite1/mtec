import React, { useEffect } from "react";
import CartHero from "../components/cart/CartHero";
import Cart from "../components/cart/Cart";

export default function CartPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <CartHero />

      <Cart />
    </div>
  );
}
