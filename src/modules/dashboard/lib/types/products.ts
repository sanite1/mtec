export interface Product {
  _id: string;
  userId: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  category?: string;
  location?: string;
  locationName?: string;
  priceRange?: string;
  variantsOptionGroup?: Array<{
    id: string;
    name: string;
    values: Array<{ id: string; value: string }>;
  }>;
  images?: string[];
  variations: ProductVariation[];
  totalStock: number;
  discountPrice: number;
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
  category?: string;
  search?: string;
  location?: string;
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
  unit: string;
  category?: string;
  locationName?: string;
  location?: string;
  images?: string[];
  priceRange?: string;
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
  search?: string;
  activity?: string;
}

// --- types/product.ts ---

export interface CreateProductPayload {
  name: string;
  description?: string;
  price?: number;
  costPrice?: number;
  locationName?: string;
  location?: string;
  discountPrice?: number;
  totalStock?: number;
  category?: string;
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
  category?: string;
  locationName?: string;
  location?: string;
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

export interface ProductStatsResponseData {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  totalStock: number;
  totalVariationStock: number;
  totalRetailValue: number;
  totalCostValue: number;
}
