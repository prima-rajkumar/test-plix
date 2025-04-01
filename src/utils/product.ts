import type { IProduct, IRelatedProduct } from "../types/product.interface";

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
