import { useState, useEffect } from 'preact/hooks';
import type { IProduct } from "../types/product.interface";
import Price from "./Price";
import Rating from "./Rating";
import AddToCartButton from "./AddToCartButton";
import { getInventoryDetails } from "../utils/product";

interface Props {
  product: IProduct;
}

export default function ProductCard({ product }: Props) {
  const { id, name, image, rating, ratingCount, unitsSold } = product;
  const [inventory, setInventory] = useState({
    defaultVariantId: '',
    isAvailable: false,
    quantityAvailable: 0,
    originalPrice: 0,
    price: 0,
    loading: true
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const details = await getInventoryDetails(id);
        setInventory({
          defaultVariantId: details.defaultVariantId as string,
          isAvailable: details.isAvailable as boolean,
          quantityAvailable: details.quantityAvailable as number,
          originalPrice: details.originalPrice as number,
          price: details.price as number,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setInventory(prev => ({ ...prev, loading: false }));
      }
    };

    fetchInventory();
  }, [id]);

  return (
    <div>
      {/* Product Image */}
      <div className="mb-5 aspect-[4/5] w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover mx-auto"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold mb-2 text-ui-dark">
          {name} for Reduced Dandruff & Itchiness
        </h2>

        {/* Rating and Sales Info */}
        <div className="flex items-center mb-2">
          <div className="border-r border-gray-400 mr-2 pr-2">
            <Rating rating={rating} />
          </div>
          <span className="text-sm font-bold border-b">
            {ratingCount} Customer Stories
          </span>
          <span className="text-gray-500 text-sm font-bold border-l border-gray-400 ml-2 pl-2">
            {unitsSold} Units Sold
          </span>
        </div>

        {/* Pricing */}
        <div className="mt-4">
          <div className="flex items-center gap-1">
            <span className="text-gray-500">MRP : </span>
            {!inventory.loading ? (
              <Price
                originalPrice={inventory.originalPrice}
                price={inventory.price}
              />
            ) : (
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
            )}
          </div>
          <p className="text-xs text-gray-500">Inclusive of all taxes</p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4 border-t border-gray-100 pt-4 px-4">
        {!inventory.loading ? (
          <AddToCartButton
            productId={inventory.defaultVariantId}
            isAvailable={inventory.isAvailable}
            quantityAvailable={inventory.quantityAvailable}
            price={inventory.price}
          />
        ) : (
          <div className="h-12 bg-gray-200 animate-pulse rounded-md"></div>
        )}
      </div>
    </div>
  );
}