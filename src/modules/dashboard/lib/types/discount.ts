export interface Discount {
  _id: string;
  userId: string;
  description?: string;
  discountName: string;
  discountType: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  location: string;
  products?: {
    productId?: string;
    variationId?: string;
    name?: string;
    price?: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface DiscountFilters {
  search?: string;
  page?: number;
  limit?: number;
  isActive?: boolean;
}

export interface DiscountResponseData {
  total: number;
  currentPage: number;
  totalPages: number;
  discounts: Discount[];
}

export interface DiscountPayload {
  userId?: string;
  description?: string;
  discountName: string;
  discountType: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  location: string;
  products?: {
    productId?: string;
    variationId?: string;
    name?: string;
    price?: number;
  }[];
}

export interface DiscountStats {
  totalCoupons: number;
  activeCoupons: number;
  scheduledCoupons: number;
  expiredCoupons: number;
}
