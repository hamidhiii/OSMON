import { SlidersHorizontal } from "lucide-react";

interface MobileFilterButtonProps {
  selectedFilters: string[];
  sortBy: string;
  setSortBy: (value: string) => void;
  setMobileFilterOpen: (open: boolean) => void;
}

export default function MobileFilterButton({
  selectedFilters,
  sortBy,
  setSortBy,
  setMobileFilterOpen,
}: MobileFilterButtonProps) {
  return (
    <div className="flex items-center justify-between mb-6 gap-4">
      <button
        onClick={() => setMobileFilterOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {selectedFilters.length > 0 && (
          <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selectedFilters.length}
          </span>
        )}
      </button>

      {/* Sort Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="featured">Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name">Name: A to Z</option>
      </select>
    </div>
  );
}