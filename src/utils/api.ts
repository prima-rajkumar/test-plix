/**
 * API utility functions for PLIX API
 */

// Base API URL
const API_BASE_URL = "https://plixlifehapi.farziengineer.co";

// Types
export interface CheckoutLine {
  variantId: number | string;
  quantity: number;
}

export interface CheckoutInput {
  lines: CheckoutLine[];
  email: string;
  isRecalculate: boolean;
}

export interface CreateCheckoutRequest {
  checkoutInput: CheckoutInput;
}

export interface AddToCartRequest {
  checkoutId: string;
  lines: CheckoutLine[];
  isRecalculate: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Get client IP address (in a real app, this would be handled server-side)
const getClientIpAddress = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to get IP address:", error);
    return "0.0.0.0"; // Fallback
  }
};

// Get user agent
const getUserAgent = (): string => {
  return navigator.userAgent;
};

// Get common headers for API requests
const getCommonHeaders = async (): Promise<HeadersInit> => {
  const clientIpAddress = await getClientIpAddress();
  const userAgent = getUserAgent();

  return {
    accept: "application/json, text/plain, */*",
    "content-type": "application/json",
    origin: window.location.origin,
    referer: window.location.origin,
    "user-agent": userAgent,
    "x-client-ip-address": clientIpAddress,
    "x-client-user-agent": userAgent,
    event_source_url: window.location.href,
  };
};

// Create checkout function
export const createCheckout = async (
  lines: CheckoutLine[],
  email: string = "dummy@dummy.com",
  isRecalculate: boolean = true
): Promise<ApiResponse<any>> => {
  try {
    const clientIpAddress = await getClientIpAddress();
    const userAgent = getUserAgent();

    const requestBody: CreateCheckoutRequest = {
      checkoutInput: {
        lines,
        email,
        isRecalculate,
      },
    };

    const response = await fetch(`${API_BASE_URL}/rest/create_checkout/`, {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json",
        origin: window.location.origin,
        referer: window.location.origin,
        "user-agent": userAgent,
        "x-client-ip-address": clientIpAddress,
        "x-client-user-agent": userAgent,
        event_source_url: window.location.href,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Checkout API request failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Add to cart function (using the specific add_to_cart endpoint)
export const addToCartWithCheckoutId = async (
  checkoutId: string,
  variantId: number | string,
  quantity: number = 1,
  isRecalculate: boolean = true
): Promise<ApiResponse<any>> => {
  try {
    const headers = await getCommonHeaders();

    const requestBody: AddToCartRequest = {
      checkoutId,
      lines: [{ variantId, quantity }],
      isRecalculate,
    };

    const response = await fetch(`${API_BASE_URL}/rest/add_to_cart/`, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Add to cart API request failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Update cart function (using the update_cart endpoint)
export const updateCart = async (
  checkoutId: string,
  lines: CheckoutLine[],
  isRecalculate: boolean = true
): Promise<ApiResponse<any>> => {
  try {
    const headers = await getCommonHeaders();

    const requestBody = {
      checkoutId,
      lines,
      isRecalculate,
    };

    const response = await fetch(`${API_BASE_URL}/rest/update_cart/`, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Update cart API request failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Helper function to update a single item in the cart
export const updateCartItem = async (
  checkoutId: string,
  variantId: number | string,
  quantity: number
): Promise<ApiResponse<any>> => {
  return updateCart(checkoutId, [{ variantId, quantity }]);
};

// Helper function to add a product to cart and create checkout
export const addToCart = async (
  variantId: number,
  quantity: number = 1
): Promise<ApiResponse<any>> => {
  const lines: CheckoutLine[] = [{ variantId, quantity }];

  return createCheckout(lines);
};

// Helper function to create checkout and then add to cart
export const createCheckoutAndAddToCart = async (
  variantId: number | string,
  quantity: number = 1
): Promise<ApiResponse<any>> => {
  try {
    // First create a checkout
    const checkoutResponse = await createCheckout(
      [{ variantId, quantity }],
      "dummy@dummy.com",
      true
    );

    if (!checkoutResponse.success || !checkoutResponse.data?.checkout?.id) {
      return checkoutResponse;
    }

    // Then add to cart using the checkout ID
    const checkoutId = checkoutResponse.data.checkout.id;
    return addToCartWithCheckoutId(checkoutId, variantId, quantity);
  } catch (error) {
    console.error("Create checkout and add to cart failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Example usage:
//
// // Add a single product to cart (using create_checkout endpoint)
// const response = await addToCart(454);
//
// // Create a checkout and add a product to cart (using both endpoints)
// const response = await createCheckoutAndAddToCart(454);
//
// // Add to cart with an existing checkout ID (using add_to_cart endpoint)
// const response = await addToCartWithCheckoutId("a46824c7-ab62-46d8-915a-d64c32b060e0", 454);
