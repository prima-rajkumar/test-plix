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

export interface IProductPrice {
  id: string;
  defaultVariant: {
    pricing: IPricing;
  };
}

export interface IProductInventory {
  id: string;
  isAvailableForPurchase: boolean;
  defaultVariant: {
    id: string;
    isAvailable: boolean;
    quantityAvailable: number;
  };
}
