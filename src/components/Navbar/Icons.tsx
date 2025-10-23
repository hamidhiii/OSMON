import { Heart, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Icons() {
  return (
    <motion.div
      className="hidden md:flex items-center gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors hover:cursor-pointer group relative">
        <Heart className="w-5 h-5 text-gray-700" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          2
        </span>
      </button>

      <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors group hover:cursor-pointer relative">
        <ShoppingBag className="w-5 h-5 text-gray-700" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
          3
        </span>
      </button>

      <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors hover:cursor-pointer group">
        <User className="w-5 h-5 text-gray-700" />
      </button>
    </motion.div>
  );
}