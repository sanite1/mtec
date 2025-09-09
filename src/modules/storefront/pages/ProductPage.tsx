import React, { useEffect } from "react";
import ProductHero from "../components/details/ProductHero";
import ProductDetails from "../components/details/ProductDetails";
import { Product } from "../types/products";
import sneakers from "./sneakers.png";

export const sampleProduct: Product = {
  id: "p1",
  name: "Classic Sneakers",
  image: sneakers,
  price: 25,
  oldPrice: 35,
  description: "lorem ipsum dolor",
  category: "Clothing",
  attributes: [
    {
      name: "Size",
      options: ["41", "42", "43", "45"],
    },
    {
      name: "Color",
      options: ["Black", "White", "Gray"],
    },
  ],
};

export default function ProductPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ProductHero />

      <ProductDetails product={sampleProduct} />
    </div>
  );
}
