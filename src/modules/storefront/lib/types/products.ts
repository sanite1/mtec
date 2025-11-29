export interface ProductFilters {
  collection?: string;
  name?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

// types/products.ts

export interface ProductVariation {
  _id: string;
  name: string;
  sku: string;
  price: number;
  costPrice: number;
  discountPrice: number;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface ProductsResponse {
  currentPage: number;
  products: ProductDetails[];
  totalPages: number;
  total: number;
}

export interface ProductDetails {
  _id: string;
  userId: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  costPrice: number;
  discountPrice: number;
  priceRange?: string;
  location?: string;
  unit: string;
  collection?: string;
  images?: string[];
  variantsOptionGroup?: Array<{
    id: string;
    name: string;
    values: Array<{ id: string; value: string }>;
  }>;
  variations: ProductVariation[];
  totalStock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
