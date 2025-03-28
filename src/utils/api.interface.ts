export interface ICheckoutLine {
  variantId: number | string;
  quantity: number;
}

export interface ICheckoutInput {
  lines: ICheckoutLine[];
  email: string;
  isRecalculate: boolean;
}

export interface ICreateCheckoutRequest {
  checkoutInput: ICheckoutInput;
}

export interface ICartRequest {
  checkoutId: string;
  lines: ICheckoutLine[];
  isRecalculate: boolean;
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
