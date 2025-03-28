interface Props {
    rating: number;
  }
  
  export default function Rating({ rating }: Props) {
    return (
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star}
            className={star <= rating ? "text-yellow-400" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>
    );
  }