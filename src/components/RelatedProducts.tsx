import { h } from 'preact';
import AddToCartButton from "./AddToCartButton";
import type { IRelatedProduct } from "../types/product.interface";

interface Props {
  currentProductId: number;
  relatedProducts: IRelatedProduct[];
}

export default function RelatedProducts({ currentProductId, relatedProducts }: Props) {
  const handleAddToCartClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-normal mb-6">You may also like</h2>

      <div className="grid grid-cols-2 gap-4">
        {relatedProducts.map((product: IRelatedProduct) => (
          <a
            key={product.id}
            href={`/?productId=${product.id}`}
            className="block border border-gray-400 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
          >
            <div className="w-full p-2">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={product.cardImage}
                  alt={product.title}
                  className="w-full aspect-square object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="p-3 pt-0">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= product.rating ? "text-yellow-400" : "text-gray-300"}
                  >
                    ★
                  </span>
                ))}
              </div>

              <h3 className="text-sm font-normal text-gray-900 mb-2 line-clamp-2 h-10 overflow-hidden">
                {product.title}
              </h3>

              <div className="flex items-center mb-4">
                {product.originalPrice && (
                  <span className="text-gray-500 line-through text-sm mr-2">
                    ₹ {product.originalPrice}
                  </span>
                )}
                <span className="text-lg font-semibold">₹ {product.price}</span>
              </div>

              <div onClick={handleAddToCartClick}>
                <AddToCartButton productId={product.id} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}