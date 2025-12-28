export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

// Order item (inside "items" array)
export interface OrderProductItem {
  productId: string;
  variationId?: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  subtotal: number;
  status: string;
}

// Shipping address
export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
}

// Each order
export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  customerId: string;
  channel?: string;
  status: "pending" | "completed" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "refunded";
  shippingStatus:
    | "pending"
    | "processing"
    | "delivered"
    | "shipped"
    | "cancelled";
  paymentMethod: "bank_transfer" | "card" | "cash" | string;
  items: OrderProductItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingFee: number;
  total: number;
  shippingAddress: ShippingAddress;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// Response from backend
export interface OrderResponseData {
  total: number;
  currentPage: number;
  totalPages: number;
  orders: Order[];
}
export interface OrderStatsResponseData {
  totalOrders: number;
  completed: number;
  pending: number;
  cancelled: number;
  refunded: number;
  revenue: number;
}

export interface OrderItem {
  productId: string;
  variationId?: string;
  price?: number;
  name?: string;
  sku?: string;
  quantity: number;
}

export interface CreateOrderPayload {
  userId?: string; // auto from JWT if not passed
  customerId?: string;
  channel?: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  note?: string;
  discount?: number;
  tax?: number;
  shippingFee?: number;
  paymentStatus?: string;
  paymentMethod?: string;
  orderStatus?: string;
}
