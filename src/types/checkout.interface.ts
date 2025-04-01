// Basic money interfaces
interface IMoney {
  amount: string;
  currency: string;
  __typename: string;
}

interface ITaxedMoney {
  gross: IMoney;
  net: IMoney;
  __typename: string;
}

// IProduct and variant related interfaces
interface IAttributeValue {
  id: string;
  name: string;
  value: string;
  __typename: string;
}

interface IAttribute {
  id: string;
  name: string;
  __typename: string;
}

interface ISelectedAttribute {
  attribute: IAttribute;
  values: IAttributeValue[];
  __typename: string;
}

interface IProductImage {
  id: string;
  sortOrder: number;
  alt: string;
  url: string;
  __typename: string;
}

interface IImage {
  url: string;
  alt: string;
  __typename: string;
}

interface IProductType {
  id: string;
  isShippingRequired: boolean;
  __typename: string;
}

interface ICategory {
  id: string;
  name: string;
  slug: string;
  __typename: string;
}

interface IVariantPricingInfo {
  onSale: boolean;
  priceUndiscounted: ITaxedMoney;
  price: ITaxedMoney;
  __typename: string;
}

interface IMetadata {
  key: string;
  value: string;
}

interface IProduct {
  id: string;
  name: string;
  slug: string;
  isAvailableForPurchase: boolean;
  weight: null | {
    unit: string;
    value: number;
  };
  category: ICategory;
  thumbnail: IImage;
  productType: IProductType;
  metadata: IMetadata[];
  tags: string[];
  __typename: string;
}

interface IProductVariant {
  id: string;
  name: string;
  sku: string;
  images: IProductImage[];
  metadata: IMetadata[];
  pricing: IVariantPricingInfo;
  attributes: ISelectedAttribute[];
  product: IProduct;
  __typename: string;
}

// Shipping related interfaces
interface IShippingMethod {
  id: string;
  name: string;
  price: IMoney;
  __typename: string;
}

interface ICountryData {
  country: string;
  code: string;
}

interface ShippingAddress {
  id: number;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: ICountryData;
  countryArea: string;
  phone: string;
}

// Checkout line item
interface ICheckoutLine {
  id: string;
  quantity: number;
  quantityAfterDiscount: number;
  totalPrice: ITaxedMoney;
  variant: IProductVariant;
  __typename: string;
}

// Main checkout interface
export interface ICheckoutResponse {
  token: string;
  id: string;
  created: boolean;
  availableShippingMethods: IShippingMethod[];
  shippingMethod: IShippingMethod;
  lines: ICheckoutLine[];
  discountedLines: any[]; // Could be further typed if needed
  shippingAddress: ShippingAddress;
  discountName: null | string;
  isShippingRequired: boolean;
  tags: string[];
  metadata: IMetadata[];
}
