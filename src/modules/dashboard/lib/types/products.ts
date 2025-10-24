export interface Product {
  _id: string;
  userId: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  collection?: string;
  images?: string[];
  totalStock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponseData {
  total: number;
  currentPage: number;
  totalPages: number;
  products: Product[];
}

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
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductDetailsResponse {
  _id: string;
  userId: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  costPrice: number;
  discountPrice: number;
  unit: string;
  collection?: string;
  images?: string[];
  variations: ProductVariation;
  totalStock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProductHistory {
  productId: string;
  source: string;
  activity: "added" | "removed" | "returned" | "sold";
  qtyBefore: number;
  qtyChange: number;
  qtyAfter: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductHistoryResponse {
  total: number;
  page: number;
  limit: number;
  history: IProductHistory[];
}

export interface ProductHistoryFilters {
  page?: number;
  limit?: number;
}
