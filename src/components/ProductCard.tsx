import type { IProduct } from "../types/product.interface";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: IProduct;
}

export default function ProductCard({ product }: Props) {
  const {
    id,
    name,
    image,
    originalPrice,
    price,
    rating = 0,
    ratingCount = 0,
    unitsSold = 0,
  } = product;

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Product Image */}
      <div className="py-5">
        <img
          src={image}
          alt={name}
          className="w-full max-h-[420px] object-contain mx-auto rounded-lg"
          height={420}
          width={320}
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold mb-2 text-ui-dark">
          {name} for Reduced Dandruff & Itchiness
        </h2>

        {/* Rating Section */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 border-r border-gray-400 mr-2 pr-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating ? "" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm font-bold border-b">
            {ratingCount} Customer Stories
          </span>
          <span className="text-gray-500 text-sm font-bold border-l border-gray-400 ml-2 pl-2">
            {unitsSold} Units Sold
          </span>
        </div>

        {/* Pricing Section */}
        <div className="mt-4">
          <div className="flex items-center">
            <span className="text-gray-500">MRP : </span>
            {originalPrice && (
              <span className="line-through text-gray-500 ml-1">
                ₹{originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-gray-800 ml-2">
              ₹{price}
            </span>
          </div>
          <p className="text-xs text-gray-500">Inclusive of all taxes</p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4 border-t border-gray-100 pt-4 px-4">
      <AddToCartButton  productId={product.id} />
      </div>
    </div>
  );
}