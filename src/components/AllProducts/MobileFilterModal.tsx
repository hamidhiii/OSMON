import { motion } from "framer-motion";
import { X } from "lucide-react";
import FiltersSidebar from "./FiltersSidebar";

interface MobileFilterModalProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedFilters: string[];
  expandedSections: string[];
  toggleSection: (section: string) => void;
  toggleFilter: (filter: string) => void;
  clearFilters: () => void;
  getFiltersForCategory: () => any[];
  onClose: () => void;
}

export default function MobileFilterModal(props: MobileFilterModalProps) {
  const { onClose } = props;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 overflow-y-auto lg:hidden"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Reuse FiltersSidebar content without the aside wrapper */}
          <div className="space-y-6">
            <FiltersSidebar {...props} />
          </div>
        </div>
      </motion.div>
    </>
  );
}