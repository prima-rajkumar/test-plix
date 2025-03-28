import { useState, useEffect } from 'preact/hooks';
import type { IRelatedProduct } from "../types/product.interface";
import Price from "./Price";
import Rating from "./Rating";
import AddToCartButton from "./AddToCartButton";
import { getInventoryDetails } from "../utils/product";

interface Props {
  product: IRelatedProduct;
}

export default function RelatedProductCard({ product }: Props) {
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
        const details = await getInventoryDetails(product.id);
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
  }, [product.id]);

  return (
    <a
      href={`/products?productId=${product.id}`}
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
          <Rating rating={product.rating} />
        </div>

        <h3 className="text-sm font-normal text-gray-900 mb-2 line-clamp-2 h-10 overflow-hidden">
          {product.title}
        </h3>

        <div className="mb-4">
          {!inventory.loading ? (
            <Price 
              originalPrice={inventory.originalPrice} 
              price={inventory.price} 
            />
          ) : (
            <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
          )}
        </div>

        {!inventory.loading ? (
          <AddToCartButton
            productId={inventory.defaultVariantId}
            isAvailable={inventory.isAvailable}
            quantityAvailable={inventory.quantityAvailable}
            price={inventory.price}
          />
        ) : (
          <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
        )}
      </div>
    </a>
  );
}