import type { IProduct, IRelatedProduct } from "../types/product.interface";
import { getProductPriceAndInventry } from "./api";

export const getRelatedProducts = (
  products: IProduct[],
  filterIds: string[] = []
): IRelatedProduct[] => {
  return products
    .filter((product) => {
      return !filterIds.includes(product.id);
    })
    .map((product) => ({
      id: product.id,
      title: product.name, // Map name to title for compatibility
      name: product.name,
      description: product.description,
      image: product.image,
      cardImage: product.cardImage,
      rating: product.rating,
    }));
};

export interface IInventoryDetails {
  defaultVariantId: string | null;
  isAvailable: boolean | null;
  quantityAvailable: number | null;
  originalPrice: number | null;
  price: number | null;
}

/**
 * Fetch product price and inventory details
 * @param productId - The ID of the product to fetch details for
 * @returns Product pricing and inventory details
 */
export async function getInventoryDetails(
  productId: string
): Promise<IInventoryDetails> {
  try {
    const response = await getProductPriceAndInventry(productId);

    // Default values
    const details: IInventoryDetails = {
      defaultVariantId: null,
      isAvailable: null,
      quantityAvailable: null,
      originalPrice: null,
      price: null,
    };

    if (response?.success) {
      const { data } = response;

      // Set price details
      details.originalPrice =
        data?.defaultVariant.pricing.priceUndiscounted.net.amount ?? null;
      details.price = data?.defaultVariant.pricing.price.net.amount ?? null;

      // Set inventory details
      details.defaultVariantId = data?.defaultVariant.id ?? null;
      details.isAvailable = data?.defaultVariant.isAvailable ?? null;
      details.quantityAvailable =
        data?.defaultVariant.quantityAvailable ?? null;
    }

    return details;
  } catch (error) {
    console.error(`Error fetching details for product ${productId}:`, error);

    // Return default values in case of error
    return {
      defaultVariantId: null,
      isAvailable: null,
      quantityAvailable: null,
      originalPrice: null,
      price: null,
    };
  }
}
