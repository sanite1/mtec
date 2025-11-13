// types/locations.ts
export interface Location {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LocationPayload {
  userId?: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface LocationFilters {
  page?: number;
  limit?: number;
  search?: string;
}

export interface LocationResponseData {
  total: number;
  currentPage: number;
  totalPages: number;
  locations: Location[];
}
