import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "./storageService";

/**
 * Utility class for cart management using localStorage
 */
export class CartStorage {
  private static readonly CHECKOUT_ID_KEY = "plix_checkout_id";
  private static readonly CHECKOUT_TOKEN_KEY = "plix_checkout_token";

  static saveCheckoutId(
    checkoutId: string,
    expiryInMinutes: number = 10080
  ): void {
    setStorageItem(this.CHECKOUT_ID_KEY, checkoutId, expiryInMinutes);
  }

  static getCheckoutId(): string | null {
    return getStorageItem<string | null>(this.CHECKOUT_ID_KEY, null);
  }

  static clearCheckoutId(): void {
    removeStorageItem(this.CHECKOUT_ID_KEY);
  }

  static saveCheckoutToken(
    checkoutToken: string,
    expiryInMinutes: number = 10080
  ): void {
    setStorageItem(this.CHECKOUT_TOKEN_KEY, checkoutToken, expiryInMinutes);
  }

  static getCheckoutToken(): string | null {
    return getStorageItem<string | null>(this.CHECKOUT_TOKEN_KEY, null);
  }

  static clearCheckoutToken(): void {
    removeStorageItem(this.CHECKOUT_TOKEN_KEY);
  }

  static clear(): boolean {
    try {
      removeStorageItem(this.CHECKOUT_ID_KEY);
      removeStorageItem(this.CHECKOUT_TOKEN_KEY);
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      return false;
    }
  }
}
