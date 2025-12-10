export interface DashboardStatsResponseData {
  totalOrders: string;
  totalCustomers: string;
  totalRevenue: string;
  totalInventoryValue: string;
}

export type SalesRangeFilter =
  | "this_month"
  | "3_months"
  | "6_months"
  | "1_year";

export interface SalesOverviewResponse {
  labels: string[];
  data: number[];
  totalRevenue: number;
}

export interface TopSellingProducts {
  productId: string;
  name: string;
  image: string;
  totalSold: number;
  price: number;
}

export interface ITodo {
  _id: string;
  userId: string;

  title: string;
  description?: string;

  type:
    | "low_stock"
    | "order_pending"
    | "order_needs_shipping"
    | "incomplete_store_setup"
    | "missing_bank_info"
    | "new_message"
    | "unfulfilled_order"
    | "product_disabled"
    | "custom_task";

  metadata: Record<string, any>; // flexible payload

  actionUrl: string; // where clicking the todo should take the user

  priority: "low" | "medium" | "high";

  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
