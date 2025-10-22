import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchBox() {
  const [focused, setFocused] = useState(false);

  return (
    <>
      {/* Desktop Search */}
      <motion.div
        className="hidden md:flex items-center flex-1 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div
          className={`flex items-center w-full bg-gray-50 border-2 rounded-full px-5 py-3 transition-all duration-300 ${
            focused
              ? "border-blue-500 shadow-lg shadow-blue-100"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded">
            ⌘K
          </kbd>
        </div>
      </motion.div>

      {/* Mobile Search */}
      <motion.div
        className="md:hidden mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center w-full bg-gray-50 border-2 border-gray-200 rounded-full px-4 py-2.5">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
          />
        </div>
      </motion.div>
    </>
  );
}