// Define standardized types for product-related data

export interface IProductDetail {
  key: string;
  value: string;
}

export interface IProductBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface IProductReview {
  rating: number;
  title: string;
  text: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  image: string; // Main detailed product image
  cardImage: string; // Optimized image for card display
  rating: number;
  ratingCount: number;
  unitsSold: string;
  details: IProductDetail[];
  benefits: IProductBenefit[];
  reviews: IProductReview[];
}

export interface IRelatedProduct {
  id: string;
  title: string;
  name: string;
  description: string;
  image: string; // Main detailed product image
  cardImage: string; // Optimized image for card display
  rating: number;
}
