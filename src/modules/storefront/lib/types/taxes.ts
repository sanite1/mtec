// types/taxes.ts
export interface Tax {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  rate: number;
  location?: string;
  locationName?: string;
  applyToCheckout: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaxPayload {
  userId?: string;
  name: string;
  description?: string;
  rate: number | string; // can be string when form-controlled
  location?: string;
  locationName?: string;
  applyToCheckout: boolean;
}

export interface TaxFilters {
  page?: number;
  limit?: number;
  search?: string;
}

export interface TaxResponseData {
  total: number;
  currentPage: number;
  totalPages: number;
  taxes: Tax[];
}
