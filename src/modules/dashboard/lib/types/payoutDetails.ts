export interface IPayoutDetails {
  _id: string;
  userId: string; // store owner reference
  accountName: string;
  accountNumber: string;
  bankName: string;
  allowCustomerCharges: boolean;
  acceptTerms: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePayoutDetailsRequest {
  accountName: string;
  accountNumber: string;
  bankName: string;
  allowCustomerCharges: boolean;
  acceptTerms: boolean;
}

export interface CreatePayoutDetailsRequest {
  accountName: string;
  accountNumber: string;
  bankName: string;
  allowCustomerCharges: boolean;
  acceptTerms: boolean;
}
