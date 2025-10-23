import {  AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface ProductsGridProps {
  sortedProducts: Product[];
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
  clearFilters: () => void;
}

export default function ProductsGrid({
  sortedProducts,
  hoveredId,
  setHoveredId,
  clearFilters,
}: ProductsGridProps) {
  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No products found matching your filters.</p>
        <button
          onClick={clearFilters}
          className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {sortedProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}