import { useCallback } from 'preact/hooks';
import { CartStorage } from "../service/cartStorage";
import { createNewCheckout, addItemToCheckout } from "../utils/cart";

interface Props {
  productId: string;
  isAvailable: boolean;
  quantityAvailable?: number;
  price: number;
}

export default function AddToCartButton({ productId, isAvailable }: Props) {
  const goToCart = useCallback(() => {
    window.location.href = "/cart";
  }, []);

  const onAddToCartClick = useCallback(async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const checkoutId = CartStorage.getCheckoutId();
    const tokenId = CartStorage.getCheckoutToken();

    if (checkoutId && tokenId) {
      try {
        await addItemToCheckout(tokenId, productId);
        goToCart();
      } catch (error) {
        console.error("Error adding item to checkout:", error);
      }
      return;
    }

    try {
      const { id, token } = await createNewCheckout(productId);
      CartStorage.saveCheckoutId(id as string);
      CartStorage.saveCheckoutToken(token as string);
      goToCart();
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  }, [productId, goToCart]);

  return (
    <div className="add-to-cart-container">
      <button
        id={`add-to-cart-btn-${productId}`}
        className={`w-full bg-ui-medium text-white py-3 px-4 rounded-md flex items-center justify-center ${
          !isAvailable ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={onAddToCartClick}
        disabled={!isAvailable}
      >
        <img
          src={'/assets/images/cart.svg'}
          alt="Cart"
          className="h-5 w-5 mr-2"
          width="20"
          height="20"
        />
        {isAvailable ? 'Add to cart' : 'Out of stock'}
      </button>
    </div>
  );
}