import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Category } from "../../constants/categories";

interface BreadcrumbProps {
  currentCategory: Category | null;
  navigateToHome: () => void;
}

export default function Breadcrumb({
  currentCategory,
  navigateToHome,
}: BreadcrumbProps) {
  return (
    <div className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
        <motion.button
          onClick={navigateToHome}
          className="hover:text-gray-900"
          whileHover={{ scale: 1.05 }}
        >
          Home
        </motion.button>
        {currentCategory && (
          <>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700">{currentCategory.name}</span>
          </>
        )}
      </div>
    </div>
  );
}
