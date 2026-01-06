import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterModalProps {
  mobileFilterOpen: boolean;
  setMobileFilterOpen: (open: boolean) => void;
  selectedFilters: string[];
  clearFilters: () => void;
  getAvailableFilters: () => string[];
  toggleFilter: (filter: string) => void;
}

export default function FilterModal({
  mobileFilterOpen,
  setMobileFilterOpen,
  selectedFilters,
  clearFilters,
  getAvailableFilters,
  toggleFilter,
}: FilterModalProps) {
  const availableFilters = getAvailableFilters();

  return (
    <AnimatePresence>
      {mobileFilterOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-80 h-full p-6 shadow-xl overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {availableFilters.map((filter) => (
                <label
                  key={filter}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(filter)}
                    onChange={() => toggleFilter(filter)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {filter}
                </label>
              ))}
            </div>

            {selectedFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="mt-6 w-full py-2 border rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                Clear all
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
