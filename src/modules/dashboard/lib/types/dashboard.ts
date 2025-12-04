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
