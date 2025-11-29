import { ProductDetails } from "../lib/types/products";

export interface ProductAttribute {
  name: string; // e.g., "Size"
  options: string[]; // e.g., ["S", "M", "L", "XL"]
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  oldPrice?: number; // optional discounted price
  category?: string; // optional category
  attributes?: ProductAttribute[]; // e.g., Size, Color
}

export interface CartItem {
  productDetails: ProductDetails;
  productId: string;
  variationId?: string;
  price: number;
  name?: string;
  sku?: string;
  quantity: number;
  selectedAttributes?: Record<string, string>;
}
