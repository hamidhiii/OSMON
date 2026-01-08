import { motion } from "framer-motion";
import type { Category } from "../../constants/categories";

interface CategoryGridProps {
  categories: Category[];
  navigateToCategory: (slug: string) => void;
}

export default function CategoryGrid({
  categories,
  navigateToCategory,
}: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-md bg-gray-50"
          onClick={() => navigateToCategory(category.slug)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-semibold">{category.name}</h3>
            <p className="text-sm opacity-90">{category.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}