import type { IRelatedProduct } from "../types/product.interface";
import RelatedProductCard from "./RelatedProductCard";

interface Props {
  relatedProducts: IRelatedProduct[];
}

export default function RelatedProducts({ relatedProducts }: Props) {
  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-normal mb-6">You may also like</h2>

      <div className="grid grid-cols-2 gap-4">
        {relatedProducts.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
