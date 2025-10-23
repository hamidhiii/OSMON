import { motion } from "framer-motion";

interface ProductsHeaderProps {
  selectedCategory: string;
  productCount: number;
}

export default function ProductsHeader({ selectedCategory, productCount }: ProductsHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h1>
          <p className="text-gray-600 text-lg">
            {productCount} products found
          </p>
        </motion.div>
      </div>
    </div>
  );
}