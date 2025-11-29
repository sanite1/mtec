export interface Shipping {
  _id: string;
  userId: string;
  name: string;
  location: string;
  description?: string;
  price: number;
  estimatedDeliveryDays?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingFilters {
  search?: string;
  location?: string;
  page?: number;
  limit?: number;
  isActive?: boolean;
}

export interface ShippingResponseData {
  total: number;
  currentPage: number;
  totalPages: number;
  shipping: Shipping[];
}

export interface ShippingForm {
  name?: string;
  description?: string;
  price?: number;
  estimatedDeliveryDays?: string;
  isActive?: boolean;
}
