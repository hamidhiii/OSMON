import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}

export default function ProductCard({
  product,
  index,
  hoveredId,
  setHoveredId,
}: ProductCardProps) {
  const isHovered = hoveredId === product.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative bg-white overflow-hidden cursor-pointer"
      onMouseEnter={() => setHoveredId(product.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        <motion.div
          className="absolute inset-0 bg-black/10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        >
          Quick View
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4 text-left">
        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="font-light text-gray-800 text-base mb-2 uppercase tracking-wide">
          {product.name}
        </h3>
        <p className="text-gray-900 font-normal text-lg">
          {product.price}
        </p>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gray-900"
        initial={{ width: 0 }}
        animate={{
          width: isHovered ? "100%" : "0%",
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}