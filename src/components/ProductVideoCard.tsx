import type { IProduct } from "../types/product.interface";
// import poster from "../assets/videos/product-video-poster.webp";
import Rating from "./Rating";

interface Props {
  product: IProduct;
}

export default function ProductVideoCard({ product }: Props) {
  const { name, rating, ratingCount, id, cardImage } = product;

  return (
    <div className="relative w-screen h-screen overflow-hidden max-w-3xl mx-auto">
      {/* Background blur */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center blur-md"
        style={{ backgroundImage: `url(${'/assets/videos/product-video-poster.webp'})` }}
        aria-hidden="true"
      />
      
      {/* Video container */}
      <div className="mb-5 w-full h-full overflow-hidden z-10 relative">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          poster={'/assets/videos/product-video-poster.webp'}
          muted // Added muted for autoplay to work in most browsers
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Product info overlay */}
      <div className="absolute left-4 right-4 bottom-4 bg-black/60 p-2 rounded-lg z-20">
        <div className="flex p-1 gap-x-3">
          {/* Product image */}
          <div className="overflow-hidden rounded-lg shrink-0">
            <img
              src={cardImage}
              alt={name}
              className="w-32 h-32 aspect-square object-contain"
              loading="lazy"
            />
          </div>
          
          {/* Product details */}
          <div className="flex flex-col justify-between w-full">
            <h2 className="text-sm font-semibold text-white overflow-hidden">
              {name}
            </h2>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex text-xs">
                <Rating rating={rating} />
              </div>
              <span className="text-white text-xs">
                ({ratingCount} Reviews)
              </span>
            </div>
            
            {/* View product button */}
            <a
              href={`/products?productId=${id}`}
              className="text-sm w-full bg-ui-medium text-white py-2 rounded-md flex items-center justify-center hover:bg-ui-dark transition-colors"
            >
              View Product
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}