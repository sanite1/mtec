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

export interface CartItem extends Product {
  quantity: number;
  selectedAttributes?: Record<string, string>;
}
