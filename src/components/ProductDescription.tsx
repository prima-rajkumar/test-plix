import { useState } from 'preact/hooks';
import ProductBenefits from "./ProductBenefits";
import RatingReviews from "./RatingReviews";
import type { IProduct } from "../types/product.interface";

interface Props {
  product: IProduct;
}

export default function ProductDescription({ product }: Props) {
  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false);
  const { description } = product;

  const toggleReviews = () => {
    setIsReviewsExpanded(!isReviewsExpanded);
  };

  return (
    <section className="my-8">
      <p className="text-gray-700 mb-6">
        {description}
      </p>

      {/* Rating & Reviews section */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full bg-gray-100 rounded-md p-3 text-left hover:bg-gray-200 transition-colors duration-200"
          aria-expanded={isReviewsExpanded}
          aria-controls="rating-reviews-content"
          onClick={toggleReviews}
        >
          <span className="font-medium text-gray-800">Rating & Reviews</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
              isReviewsExpanded ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          id="rating-reviews-content"
          className={`bg-gray-100 -mt-4 pt-6 rounded-lg ${
            isReviewsExpanded ? 'block' : 'hidden'
          }`}
        >
          <RatingReviews product={product} />
        </div>
      </div>

      {/* Benefits section */}
      <ProductBenefits product={product} />
    </section>
  );
}