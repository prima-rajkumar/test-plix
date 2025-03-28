export interface IPriceAmount {
  amount: number;
  currency: string;
}

export interface IPrice {
  gross: IPriceAmount;
  net: IPriceAmount;
}

export interface IPricing {
  onSale: boolean;
  priceUndiscounted: IPrice;
  price: IPrice;
}

export interface IDefaultVariantPriceAndInventory {
  id: string;
  isAvailable: boolean;
  quantityAvailable: number;
  pricing: IPricing;
}

export interface IProductPriceAndInventory {
  id: string;
  isAvailableForPurchase: boolean;
  defaultVariant: IDefaultVariantPriceAndInventory;
}
