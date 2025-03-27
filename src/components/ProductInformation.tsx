import { useState } from 'preact/hooks';
import ProductDescription from "./ProductDescription";
import ProductDetails from "./ProductDetails";
import type { IProduct } from "../types/product.interface";

interface Props {
  product: IProduct;
}

export default function ProductInformation({ product }: Props) {
  const [activeTab, setActiveTab] = useState<'description' | 'details'>('description');

  return (
    <section className="py-8 px-4">
      {/* Tab navigation */}
      <div className="border-b border-gray-200">
        <div
          role="tablist"
          className="flex -mb-px"
          aria-label="Product information tabs"
        >
          <button
            id="tab-btn-description"
            role="tab"
            className={`py-3 px-4 border-b-2 mr-8 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
              activeTab === 'description'
                ? 'border-gray-800 text-gray-800 font-medium'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            aria-selected={activeTab === 'description'}
            aria-controls="tab-description"
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            id="tab-btn-details"
            role="tab"
            className={`py-3 px-4 border-b-2 mr-8 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
              activeTab === 'details'
                ? 'border-gray-800 text-gray-800 font-medium'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            aria-selected={activeTab === 'details'}
            aria-controls="tab-details"
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {/* Description tab */}
        <div
          id="tab-description"
          role="tabpanel"
          aria-labelledby="tab-btn-description"
          className={`transition-opacity duration-300 ${
            activeTab === 'description' ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        >
          <ProductDescription product={product} />
        </div>

        {/* Details tab */}
        <div
          id="tab-details"
          role="tabpanel"
          aria-labelledby="tab-btn-details"
          className={`transition-opacity duration-300 ${
            activeTab === 'details' ? 'opacity-100 block' : 'opacity-0 hidden'
          }`}
        >
          <ProductDetails product={product} />
        </div>
      </div>
    </section>
  );
}