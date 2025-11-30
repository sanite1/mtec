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
  locationName: string;
  allProducts?: string;
  products?: {
    productId?: string;
    variationId?: string;
    name?: string;
    price?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface VerifyDiscountPayload {
  discountName: string;
  location?: string;
}
