export interface CustomerStatsResponseData {
  totalCustomers: number;
  newsletterSubscribers: number;
  subscriptionRate: string;
  newCustomersThisMonth: number;
}

export interface CustomerFilters {
  search?: string;
  page?: number;
  limit?: number;
  newsletter?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface Customer {
  userId: string; // store owner
  _id: string; // store owner
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  additionalInfo?: string;
  createdAt: string;
  updatedAt: string;
  newsletterSubscribed?: boolean;

  shipping?: {
    address?: string;
    country: string;
    state?: string;
    city?: string;
    zip?: string;
  };

  billing?: {
    sameAsShipping?: boolean;
    address?: string;
    country?: string;
    state?: string;
    city?: string;
    zip?: string;
  };
}

export interface CustomerResponseData {
  total: number;
  currentPage: number;
  totalPages: number;
  customers: Customer[];
}
