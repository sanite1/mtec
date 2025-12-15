export interface PaymentFilters {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface Payment {
  orderId: string;
  userId: string;
  reference: string;
  orderNumber: string;
  paidAt: Date;
  method: string;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "failed" | "refunded";
  channel: "website";
  customerEmail: string;
  createdAt: Date;
}

// Response from backend
export interface PaymentResponseData {
  total: number;
  currentPage: number;
  totalPages: number;
  payments: Payment[];
}

export interface PaymentStatsResponseData {
  totalTransactions: number;
  successfulPayments: number;
  refundedPayments: number;
  failedPayments: number;
  totalTransactionAmount: number;
  availableBalance: number;
  pendingBalance: number;
  refund: number;
  offlineTransactions: number;
}
