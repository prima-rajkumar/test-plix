interface Props {
    originalPrice: number;
    price: number;
  }
  
  export default function Price({ originalPrice, price }: Props) {
    return (
      <div className="flex items-center">
        {originalPrice !== price && (
          <span className="text-gray-500 line-through text-sm mr-2">
            ₹ {originalPrice}
          </span>
        )}
        <span className="text-lg font-semibold">₹ {price}</span>
      </div>
    );
  }