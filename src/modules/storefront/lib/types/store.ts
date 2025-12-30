export interface IStoreDetails {
  userId: string; // Owner of the store
  logoUrl?: string; // File upload URL
  country: string;
  state: string;
  zipCode: string;
  streetAddress: string;
  businessEmail: string;
  storeColor: string;
  isLightColor: boolean;
  businessPhone: string;
  website?: string;
  lowStock?: number;
  showOutOfStock?: boolean;
  showStockCount?: boolean;
  productNoteEnabled?: boolean;
  productNoteTitle?: string;
  productNotePlaceholder?: string;
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
