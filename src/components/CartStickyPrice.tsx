import { useEffect, useState } from 'preact/hooks';
import type { IProduct } from "../types/product.interface";
import { CartStorage } from "../service/cartStorage";

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface Props {
  cartItems?: CartItem[];
}

declare global {
  interface Window {
    gokwikSdk?: {
      initCheckout: (options: any) => void;
    };
  }
}

export default function CartStickyPrice({ cartItems = [] }: Props) {
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  
  // Calculate totals
  const itemsTotal = cartItems.reduce(
    (total, item) => total + 100 * item.quantity,
    0
  );
  const shippingHandling = 5.5;
  const beforeTax = itemsTotal + shippingHandling;
  const taxCollected = beforeTax * 0.132; // 13.2% tax rate
  const totalAmount = beforeTax + taxCollected;

  const initGoKwik = () => {
    if (typeof window.gokwikSdk !== "undefined") {
      window.gokwikSdk.initCheckout({
        environment: "sandbox",
        type: "merchantInfo",
        mid: "12wyqc2h4ylkse6ovce",
        phoneNumber: "+919567759520",
        bannerMessages: ["Sample message one", "Sample message two"],
        merchantParams: {
          merchantCheckoutId: CartStorage.getCheckoutId(),
          customerToken: CartStorage.getCheckoutToken(),
          origReferrer: window.location.href,
          adSource: "",
          landingPage: window.location.origin,
        },
      });
      console.log("GoKwik SDK initialized");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sandbox.pdp.gokwik.co/build/gokwik.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePlaceOrder = () => {
    initGoKwik();
  };

  const togglePriceDetails = () => {
    setShowPriceDetails(!showPriceDetails);
  };

  return (
    <section>
      <div className="h-36"></div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-3xl mx-auto px-4 pt-3 pb-8">
          <div
            className={`price-details overflow-hidden transition-all duration-300 ${
              showPriceDetails ? "max-h-[200px]" : "max-h-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-y-1 text-sm mb-2">
              <div className="text-gray-600">Items ({cartItems.length}):</div>
              <div className="text-right font-medium">{itemsTotal.toFixed(2)}</div>

              <div className="text-gray-600">Shipping and handling:</div>
              <div className="text-right font-medium">
                {shippingHandling.toFixed(2)}
              </div>

              <div className="text-gray-600">Before tax:</div>
              <div className="text-right font-medium">{beforeTax.toFixed(2)}</div>

              <div className="text-gray-600">Tax Collected:</div>
              <div className="text-right font-medium">{taxCollected.toFixed(2)}</div>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
          </div>

          <div 
            className="flex justify-between items-center toggle-price-details cursor-pointer"
            onClick={togglePriceDetails}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  showPriceDetails ? "" : "rotate-180"
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
              <span className="font-medium ml-1 text-gray-600">Total amount</span>
            </div>
            <div className="font-bold text-xl">₹{Math.round(totalAmount)}</div>
          </div>

          <button
            className="w-full bg-ui-primary text-white py-3 px-4 rounded-md flex items-center justify-between mt-3"
            onClick={handlePlaceOrder}
          >
            <div className="flex-1 text-left">PLACE ORDER</div>
            <img
              src={'/assets/images/payment-icon.svg'}
              alt="Cart"
              className="h-7 w-auto shrink-0"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </section>
  );
}