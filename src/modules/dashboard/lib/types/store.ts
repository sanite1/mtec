export interface IStoreDetails {
  userId: string; // Owner of the store
  logoUrl?: string; // File upload URL
  country: string;
  _id: string;
  state: string;
  zipCode: string;
  streetAddress: string;
  lowStock: number;
  showOutOfStock: boolean;
  showStockCount: boolean;
  businessEmail: string;
  businessPhone: string;
  website?: string;
  storeName: string;
  slug: string;
  storeColor: string;
  productNoteEnabled?: boolean;
  productNoteTitle?: string;
  productNotePlaceholder?: string;
  isLightColor: boolean;
  storeLink: string;
  businessName: string;
  businessSector: string;
  tagline?: string;
  storeDescription: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStoreCreate {
  userId: string; // Owner of the store
  logoUrl?: File; // File upload URL
  country: string;
  state: string;
  zipCode: string;
  streetAddress: string;
  businessEmail: string;
  businessPhone: string;
  slug: string;
  storeLink: string;
  website?: string;
  storeColor: string;
  isLightColor: boolean;
  storeName: string;
  businessName: string;
  businessSector: string;
  tagline?: string;
  storeDescription: string;
}

export interface IStoreUpdate {
  logoUrl?: File; // File upload URL
  country: string;
  state: string;
  zipCode: string;
  streetAddress: string;
  businessEmail: string;
  businessPhone: string;
  storeColor: string;
  lowStock?: number;
  showOutOfStock?: boolean;
  showStockCount?: boolean;
  productNoteEnabled?: boolean;
  productNoteTitle?: string;
  productNotePlaceholder?: string;
  isLightColor: boolean;
  slug: string;
  storeLink: string;
  website?: string;
  storeName: string;
  businessName: string;
  businessSector: string;
  tagline?: string;
  storeDescription: string;
}
