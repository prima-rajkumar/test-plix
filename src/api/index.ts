import type { ICheckoutResponse } from "../types/checkout.interface";
import type {
  IApiResponse,
  ICartRequest,
  ICheckoutLine,
  ICreateCheckoutRequest,
} from "./api.interface";
import { decodeBase64 } from "../utils/decodeBase64";
import type {
  IProductPrice,
  IProductInventory,
} from "../types/price-and-inventory.interface";

// Base API URL
const API_BASE_URL = "https://plixlifehapi.farziengineer.co";

const getDecodedLines = (lines: ICheckoutLine[]) => {
  return lines.map((line) => {
    const decodedVariant = decodeBase64(line.variantId as string);
    const decodedId = decodedVariant.split(":").pop() as string;
    return {
      quantity: line.quantity,
      variantId: decodedId,
    };
  });
};

export const getProductPrice = async (
  productId: string
): Promise<IApiResponse<IProductPrice>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/graphql/?source=website`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName: "GetProductDetails",
        variables: {
          id: productId,
        },
        query: `
          fragment Price on TaxedMoney {
            gross {
              amount
              currency
            }
            net {
              amount
              currency
            }
          }

          query GetProductDetails($id: ID!) {
            product(id: $id) {
              id
              defaultVariant {
                pricing {
                  onSale
                  priceUndiscounted {
                    ...Price
                  }
                  price {
                    ...Price
                  }
                }
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `API error: ${response.status} ${response.statusText}`
      );
    }

    const jsonResponse = await response.json();
    return {
      success: true,
      data: jsonResponse.data.product,
    };
  } catch (error) {
    console.error("Product Price API request failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const getProductInventry = async (
  productId: string
): Promise<IApiResponse<IProductInventory>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/graphql/?source=website`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName: "GetProductDetails",
        variables: {
          id: productId,
        },
        query: `
          fragment ProductVariantFields on ProductVariant {
            id
            isAvailable
            quantityAvailable(countryCode: IN)
          }

          query GetProductDetails($id: ID!) {
            product(id: $id) {
              id
              isAvailableForPurchase
              defaultVariant {
                ...ProductVariantFields
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `API error: ${response.status} ${response.statusText}`
      );
    }

    const jsonResponse = await response.json();
    return {
      success: true,
      data: jsonResponse.data.product,
    };
  } catch (error) {
    console.error("Product Price API request failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const createCheckout = async (
  lines: ICheckoutLine[],
  email: string = "dummy@dummy.com",
  isRecalculate: boolean = true
): Promise<IApiResponse<ICheckoutResponse>> => {
  try {
    const requestBody: ICreateCheckoutRequest = {
      checkoutInput: {
        lines: getDecodedLines(lines),
        email,
        isRecalculate,
      },
    };

    const response = await fetch(`${API_BASE_URL}/rest/create_checkout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const addToCart = async (
  checkoutToken: string,
  lines: ICheckoutLine[],
  isRecalculate: boolean = true
): Promise<IApiResponse<ICheckoutResponse>> => {
  try {
    const requestBody: ICartRequest = {
      checkoutId: checkoutToken,
      lines: getDecodedLines(lines),
      isRecalculate,
    };

    const response = await fetch(`${API_BASE_URL}/rest/add_to_cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    console.error("Add to cart API request failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const updateCart = async (
  checkoutToken: string,
  lines: ICheckoutLine[],
  isRecalculate: boolean = true
): Promise<IApiResponse<ICheckoutResponse>> => {
  try {
    const requestBody: ICartRequest = {
      checkoutId: checkoutToken,
      lines: getDecodedLines(lines),
      isRecalculate,
    };

    const response = await fetch(`${API_BASE_URL}/rest/update_cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    console.error("Update cart API request failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
