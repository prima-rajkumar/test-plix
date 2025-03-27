import { useState } from 'preact/hooks';
import cartSvg from "../assets/images/cart.svg";
import { createCheckoutAndAddToCart } from "../utils/api";

interface Props {
  productId: number | string;
}

export default function AddToCartButton({ productId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleAddToCart = async () => {
    console.log("Adding to cart...");
    setIsLoading(true);
    setIsError(false);
    setMessage('');

    try {
      const response = await createCheckoutAndAddToCart(productId.toString(), 1);

      if (response.success) {
        setMessage("Product added to cart successfully!");
      } else {
        throw new Error(response.error || "Failed to add product to cart");
      }
    } catch (error: unknown) {
      console.error("Error adding to cart:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to add product to cart";
      setMessage(errorMessage);
      setIsError(true);
    } finally {
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="add-to-cart-container">
      <button
        id={`add-to-cart-btn-${productId}`}
        className={`w-full bg-ui-dark hover:bg-green-800 text-white py-3 px-4 rounded-md flex items-center justify-center ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        <img
          src={cartSvg.src}
          alt="Cart"
          className="h-5 w-5 mr-2"
          width="20"
          height="20"
        />
        {isLoading ? 'Adding to cart...' : 'Add to cart'}
      </button>
      
      {message && (
        <div 
          id={`cart-message-${productId}`}
          className={`mt-2 text-center ${
            isError ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}