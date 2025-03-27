
import iconSvg from "../assets/images/icon.svg";
import cartSvg from "../assets/images/cart.svg";

export default function Header() {
  

  return (
    <header class="bg-ui-primary px-4 py-3.5">
      <div class="flex justify-between items-center">
        <a href="/" class="logo">
          <img
            src={iconSvg.src}
            alt="PLIX"
            class="h-6 w-20"
            height="24"
            width="80"
          />
        </a>
        <a href="/cart" class="cursor-pointer relative">
          <img
            src={cartSvg.src}
            alt="Shopping Cart"
            class="h-5 w-6"
            height="20"
            width="24"
          />
         
        </a>
      </div>
    </header>
  );
}