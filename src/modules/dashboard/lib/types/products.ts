export interface Product {
  _id: string;
  userId: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  collection?: string;
  priceRange?: string;
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
  costPrice: number;
  discountPrice: number;
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

// --- types/product.ts ---

export interface CreateProductPayload {
  name: string;
  description?: string;
  price?: number;
  costPrice?: number;
  discountPrice?: number;
  totalStock?: number;
  collection?: string;
  variants?: Array<{
    name: string;
    sku?: string;
    price?: number;
    costPrice?: number;
    discountPrice?: number;
    stock?: number;
  }>;
  variantsOptionGroup?: Array<{
    id: string;
    name: string;
    values: Array<{ id: string; value: string }>;
  }>;
  images?: File[];
}

export interface CreateProductResponse {
  id: string;
  name: string;
  slug: string;
  price?: number;
  costPrice?: number;
  discountPrice?: number;
  totalStock?: number;
  collection?: string;
  variations?: any[];
  variantsOptionGroup?: any[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// types/product.ts
export interface UpdateQuantityPayload {
  type: "added" | "removed" | "returned";
  quantity: number;
  note?: string;
}

export interface UpdateQuantityResponse {
  success: boolean;
  message: string;
  updatedQuantity?: number;
}
