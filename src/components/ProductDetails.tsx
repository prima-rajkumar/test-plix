import type { IProduct, IProductDetail } from "../types/product.interface";

interface Props {
  product: IProduct;
}

export default function ProductDetails({ product }: Props) {
  const { details } = product;

  return (
    <div className="overflow-hidden border border-gray-200 rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200 bg-gray-50">
          {details.map((detail: IProductDetail) => (
            <tr key={detail.key} className="divide-x divide-gray-200">
              <th className="px-4 py-3 text-left text-xs font-bold tracking-wider w-1/3">
                {detail.key}
              </th>
              <td className="px-4 py-3 text-sm text-gray-500">{detail.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}