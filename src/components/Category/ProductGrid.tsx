import { motion } from "framer-motion";
import type { Product } from "../../constants/products";

interface ProductGridProps {
  sortedProducts: Product[];
}

export default function ProductGrid({
  sortedProducts,
}: ProductGridProps) {
  if (sortedProducts.length === 0) {
    return <p className="text-gray-500 text-center">No products found.</p>;
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {sortedProducts.map((product) => (
        <motion.div
          key={product.id}
          className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-md cursor-pointer"
        >
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
            <p className="text-gray-700">{product.price}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
