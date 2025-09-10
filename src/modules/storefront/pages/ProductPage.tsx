import React, { useEffect } from "react";
import ProductHero from "../components/details/ProductHero";
import ProductDetails from "../components/details/ProductDetails";

export default function ProductPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ProductHero />

      <ProductDetails />
    </div>
  );
}
