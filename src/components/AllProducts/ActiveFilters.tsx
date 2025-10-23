import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  selectedFilters: string[];
  toggleFilter: (filter: string) => void;
}

export default function ActiveFilters({ selectedFilters, toggleFilter }: ActiveFiltersProps) {
  if (selectedFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {selectedFilters.map((filter) => (
        <motion.span
          key={filter}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
        >
          {filter}
          <button
            onClick={() => toggleFilter(filter)}
            className="hover:bg-blue-100 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.span>
      ))}
    </div>
  );
}