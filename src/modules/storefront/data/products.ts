import { Product } from "../types/products";
import sneakers from "../pages/sneakers.png";
import wallet from "../pages/wallet.png";
import Smartphone from "../pages/smartphone.png";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Leather Wallet",
    image: wallet,
    price: 29000,
    oldPrice: 35000,
    category: "Accessories",
    description:
      "A premium handcrafted leather wallet made from full-grain leather. Compact yet spacious enough to hold cards, cash, and coins.",
  },
  {
    id: "2",
    name: "Running Sneakers",
    image: sneakers,
    price: 30500,
    oldPrice: 40000,
    category: "Footwear",
    description:
      "Lightweight and breathable running sneakers designed for comfort and durability. Ideal for both workouts and casual wear.",
    attributes: [
      { name: "Size", options: ["38", "39", "40", "41", "42", "43", "44"] },
      { name: "Color", options: ["Black", "White", "Blue"] },
    ],
  },
  {
    id: "3",
    name: "Smartphone Pro X",
    image: Smartphone,
    price: 250000,
    oldPrice: 280000,
    category: "Electronics",
    description:
      "Smartphone Pro X with a stunning AMOLED display, ultra-fast processor, and professional-grade camera system. Experience the future of mobile technology.",
    attributes: [
      { name: "Color", options: ["Black", "Silver", "Gold"] },
      { name: "Storage", options: ["128GB", "256GB", "512GB"] },
    ],
  },
];
