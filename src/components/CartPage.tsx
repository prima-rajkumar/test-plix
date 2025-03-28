import { useState } from 'preact/hooks';
import type { IProduct } from "../types/product.interface";
import Price from './Price';

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface Props {
  cartItems?: CartItem[];
}

export default function CartPage({ cartItems = [] }: Props) {
  const [items, setItems] = useState<CartItem[]>(cartItems);

  const handleDecrement = (index: number) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      if (newItems[index].quantity > 1) {
        newItems[index].quantity -= 1;
      }
      return newItems;
    });
    updateCartTotal();
  };

  const handleIncrement = (index: number) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index].quantity += 1;
      return newItems;
    });
    updateCartTotal();
  };

  const handleRemoveItem = (index: number) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
    updateCartTotal();
  };

  const updateCartTotal = () => {
    // This is a simplified version - in a real app, you'd recalculate based on quantities
    console.log("Cart total updated");
  };

  return (
    <section className="py-8 px-4 bg-gray-100">
      <div className="bg-white rounded-lg overflow-hidden w-full">
        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }, index) => (
                <div key={`${product.id}-${index}`} className="cart-item border-b pb-4 mb-4 border-gray-100 last:border-b-0 last:pb-0 last:mb-0">
                  <div className="flex items-center">
                    <div className="w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-[18px] font-normal text-[#121212] leading-tight mb-2 pr-4">
                          {product.name}
                        </h3>
                        <button 
                          className="text-[#FF5F5F] remove-item-btn"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <Price price={100} originalPrice={200} />
                    <div className="flex items-center border border-[#999393] rounded-md quantity-control">
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-[18px] text-gray-600 decrement-btn"
                        onClick={() => handleDecrement(index)}
                      >
                        -
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center text-[18px] font-bold quantity-display">
                        {quantity}
                      </span>
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-[18px] text-gray-600 increment-btn"
                        onClick={() => handleIncrement(index)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}