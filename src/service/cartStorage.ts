import type { ICheckoutResponse } from "../types/checkout.interface";
import type { ICartProduct } from "../types/product.interface";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "./storageService";
import { cartEvents } from "./eventCartService";

/**
 * Utility class for cart management using localStorage
 */
export class CartStorage {
  private static readonly CHECKOUT_KEY = "data_checkout";

  static getCheckoutId(): string | null {
    const data = this.getCart();
    return data?.id || null;
  }

  static getCheckoutToken(): string | null {
    const data = this.getCart();
    return data?.token || null;
  }
  static getCartTotal(): number {
    const data = this.getCart();
    return (
      data?.lines.reduce((total, line) => {
        const amount = parseFloat(line.totalPrice.net.amount);
        const count = line.quantity;
        return total + (isNaN(amount) ? 0 : amount * count);
      }, 0) || 0
    );
  }

  static getCartItemCount(): number {
    const data = this.getCart();
    return (
      data?.lines.reduce((total, line) => {
        const count = line.quantity;
        return total + (isNaN(count) ? 0 : count);
      }, 0) || 0
    );
  }

  static saveCart(
    data: ICheckoutResponse,
    expiryInMinutes: number = 10080
  ): void {
    setStorageItem(this.CHECKOUT_KEY, data, expiryInMinutes);

    // Publish cart updated event
    cartEvents.publish("cart:updated", data);
  }

  static getCart(): ICheckoutResponse | null {
    return getStorageItem<ICheckoutResponse | null>(this.CHECKOUT_KEY, null);
  }

  static getCartProducts(): ICartProduct[] {
    const data = this.getCart();
    return (
      data?.lines.map((line) => {
        return {
          id: line.variant.product.id,
          variantId: line.variant.id,
          name: line.variant.product.name,
          cardImage: line.variant.product.thumbnail.url,
          price: line.totalPrice.net.amount,
          currency: line.totalPrice.net.currency,
          quantity: line.quantity,
        };
      }) || []
    );
  }

  static clearCart(): void {
    removeStorageItem(this.CHECKOUT_KEY);
  }
}
