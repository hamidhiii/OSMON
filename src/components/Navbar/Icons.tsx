import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function Icons() {
  return (
    <motion.div
      className="flex items-center gap-2 hover:cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      {[<Heart />, <ShoppingBag />].map((Icon, i) => (
        <motion.button
          key={i}
          className="p-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon.type className="w-5 h-5 text-gray-600" />
        </motion.button>
      ))}

      <motion.img
        src="https://i.pravatar.cc/32"
        alt="User avatar"
        className="w-8 h-8 rounded-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
