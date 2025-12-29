export interface Shipping {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  price: number;
  location?: string;
  locationName?: string;
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
  location?: string;
  locationName?: string;
  price?: number;
  estimatedDeliveryDays?: string;
  isActive?: boolean;
}
