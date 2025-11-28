export interface IStoreDetails {
  userId: string; // Owner of the store
  logoUrl?: string; // File upload URL
  country: string;
  state: string;
  zipCode: string;
  streetAddress: string;
  businessEmail: string;
  businessPhone: string;
  website?: string;
  storeName: string;
  slug: string;
  storeLink: string;
  businessName: string;
  businessSector: string;
  tagline?: string;
  storeDescription: string;
  createdAt?: Date;
  updatedAt?: Date;
}
