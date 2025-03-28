import { addToCart, createCheckout, updateCart } from "./api";

interface ICreateCheckout {
  id: string | null;
  token: string | null;
}

export const createNewCheckout = async (
  productId: string
): Promise<ICreateCheckout> => {
  try {
    const response = await createCheckout([
      {
        variantId: productId,
        quantity: 1,
      },
    ]);

    if (response?.success) {
      return {
        id: response.data.id,
        token: response.data.token,
      };
    }
  } catch (error) {
    console.error(`Error creating checkout for product ${productId}:`, error);
  }

  return {
    id: null,
    token: null,
  };
};

export const addItemToCheckout = async (
  token: string,
  productId: string
): Promise<ICreateCheckout> => {
  try {
    const response = await addToCart(token, [
      {
        variantId: productId,
        quantity: 1,
      },
    ]);

    if (response?.success) {
      return {
        id: response.data.id,
        token: response.data.token,
      };
    }
  } catch (error) {
    console.error(`Error creating checkout for product ${productId}:`, error);
  }

  return {
    id: null,
    token: null,
  };
};

export const updateItemToCheckout = async (
  toekn: string,
  productId: string,
  quantity: number
): Promise<ICreateCheckout> => {
  try {
    const response = await updateCart(toekn, [
      {
        variantId: productId,
        quantity: quantity,
      },
    ]);

    if (response?.success) {
      return {
        id: response.data.id,
        token: response.data.token,
      };
    }
  } catch (error) {
    console.error(`Error creating checkout for product ${productId}:`, error);
  }

  return {
    id: null,
    token: null,
  };
};
