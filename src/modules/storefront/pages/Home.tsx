import React from "react";
import HeroSection from "../components/home/HomeHero";
import { Product } from "../types/products";
import ProductCards from "../components/home/ProductCards";
import Wallet from "./wallet.png";
import sneakers from "./sneakers.png";
import smartphone from "./smartphone.png";

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Classic Leather Wallet",
    image: Wallet,
    price: 35,
    category: "Men",
    // no oldPrice (no discount)
    // no attributes
  },
  {
    id: "2",
    name: "Running Sneakers",
    image: sneakers,
    price: 80,
    category: "",
    oldPrice: 120, // shows slashed old price
    attributes: [
      {
        name: "Size",
        options: ["38", "39", "40", "41", "42", "43"],
      },
    ],
  },
  {
    id: "3",
    name: "Smartphone X200",
    image: smartphone,
    price: 950,
    oldPrice: 1100, // optional discount
    attributes: [
      {
        name: "Color",
        options: ["Black", "Silver", "Blue"],
      },
      {
        name: "Storage",
        options: ["128GB", "256GB", "512GB"],
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="">
      {/* Hero with image + text */}
      <HeroSection
        banner="/images/HeroSection-banner.jpg"
        title="Welcome to MTEC Store"
        subtitle="Shop the latest products at unbeatable prices"
      />

      <ProductCards products={sampleProducts} />
    </div>
  );
}
