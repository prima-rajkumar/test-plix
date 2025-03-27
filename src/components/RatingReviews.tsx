import type { IProduct, IProductReview } from "../types/product.interface";

interface Props {
  product: IProduct;
}

export default function RatingReviews({ product }: Props) {
  const { reviews, ratingCount: totalReviews } = product;

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((review: IProductReview, index: number) => (
          <div 
            key={`${review.title}-${index}`}
            className={`p-4 ${index < reviews.length - 1 ? "border-b border-gray-300" : ""}`}
          >
            {/* Star rating */}
            <div className="flex mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={star <= review.rating ? "text-yellow-400" : "text-gray-200"}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              ))}
            </div>
            
            {/* Review title and text */}
            <h4 className="font-medium text-gray-900">{review.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{review.text}</p>
          </div>
        ))}
      </div>

      {/* View all reviews button */}
      <button className="w-full mt-4 py-3 flex items-center justify-center text-gray-700 border-t border-gray-300 focus:outline-none transition-colors duration-200 hover:bg-gray-200">
        <span className="font-medium">View All {totalReviews} Reviews</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 ml-1" 
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
    </div>
  );
}