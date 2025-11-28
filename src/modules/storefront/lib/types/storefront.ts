export interface BannerPayload {
  title?: string;
  subtext?: string;
  image?: string;
}

export interface AboutPayload {
  title?: string;
  content?: string;
}

export interface ContactPayload {
  email?: string;
  phone?: string;
  address?: string;
}

export interface LocationPayload {
  address?: string;
}

export interface NewsletterPayload {
  headline?: string;
  subtext?: string;
  img?: File | string | null;
}

export interface ReturnPolicyPayload {
  content?: string;
}

export interface SocialMediaPayload {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
}

export interface CustomMessagePayload {
  message?: string;
}

export interface ProductVariationPayload {
  enabled?: boolean;
}

export interface WhatsappPayload {
  number?: string;
}

export interface StorefrontResponse {
  _id: string;
  userId: string;
  theme: string;
  banner?: BannerPayload;
  about?: AboutPayload;
  contact?: ContactPayload;
  location?: LocationPayload;
  newsletter?: NewsletterPayload;
  returnPolicy?: ReturnPolicyPayload;
  socialMedia?: SocialMediaPayload;
  customMessage?: CustomMessagePayload;
  productVariation?: ProductVariationPayload;
  whatsapp?: WhatsappPayload;
  createdAt?: string;
  updatedAt?: string;
}
