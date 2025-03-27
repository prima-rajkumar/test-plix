import type { IProduct, IProductBenefit } from "../types/product.interface";

interface Props {
  product: IProduct;
}

// Map of icon names to SVG paths
const iconPaths = {
  check: "M5 13l4 4L19 7",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  lightning: "M13 10V3L4 14h7v7l9-11h-7z",
  database: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
};

export default function ProductBenefits({ product }: Props) {
  const { name, benefits } = product;

  return (
    <div className="bg-ui-pink rounded-lg p-6 relative overflow-hidden">
      {/* Heading */}
      <h2 className="text-2xl italic text-black font-bold mb-6 relative z-10">
        Why Plix {name}
      </h2>

      {/* Benefits list */}
      <div className="space-y-8 relative z-10">
        {benefits.map((benefit: IProductBenefit) => (
          <div key={benefit.title} className="flex group hover:translate-x-1 transition-transform duration-200">
            <div className="mr-4 bg-green-100 rounded-full p-2 h-12 w-12 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={iconPaths[benefit.icon as keyof typeof iconPaths]}
                />
              </svg>
            </div>
            <div className="benefit-text">
              <h3 className="font-semibold text-black mb-4">{benefit.title}</h3>
              <p className="text-sm text-gray-800">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}