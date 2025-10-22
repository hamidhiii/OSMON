import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchBox() {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className="hidden md:flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      <Search className="w-4 h-4 text-gray-400" />

      <motion.input
        type="text"
        placeholder="Search"
        className="outline-none text-sm text-gray-600 bg-transparent placeholder-gray-400"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        animate={{
          width: focused ? 300 : 100, // ← ширина в пикселях
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
      />
    </motion.div>
  );
}
