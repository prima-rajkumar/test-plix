import { addToCart, updateCart } from "../api";
import { CartStorage } from "../service/cartStorage";
import type { ICheckoutLine } from "../api/api.interface";
import type { ICheckoutResponse } from "../types/checkout.interface";

export const incrementCartItem = async (
  variantId: string,
  quantity: number = 1
): Promise<boolean> => {
  try {
    // Get the current checkout ID
    const checkoutToken = CartStorage.getCheckoutToken();

    if (!checkoutToken) {
      console.error("No checkout ID found");
      return false;
    }

    // Prepare the line item
    const lines: ICheckoutLine[] = [
      {
        variantId,
        quantity,
      },
    ];

    // Call the API to add to cart
    const response = await addToCart(checkoutToken, lines);

    if (response.success && response.data) {
      // Save the updated cart data
      CartStorage.saveCart(response.data as ICheckoutResponse);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error incrementing cart item:", error);
    return false;
  }
};

export const removeCartItem = async (
  variantId: string,
  quantity = 0
): Promise<boolean> => {
  try {
    // Get the current checkout ID
    const checkoutToken = CartStorage.getCheckoutToken();

    if (!checkoutToken) {
      console.error("No Checkout Token ID found");
      return false;
    }

    // Prepare the line item with quantity 0 to remove it
    const lines: ICheckoutLine[] = [
      {
        variantId,
        quantity,
      },
    ];

    // Call the API to update the cart
    const response = await updateCart(checkoutToken, lines);

    if (response.success && response.data) {
      // Save the updated cart data
      CartStorage.saveCart(response.data as ICheckoutResponse);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error removing cart item:", error);
    return false;
  }
};
