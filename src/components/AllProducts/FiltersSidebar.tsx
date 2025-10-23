import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MENU_LINKS } from "@/constants/menulink";

interface FilterGroup {
  title: string;
  items: string[];
}

interface FiltersSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedFilters: string[];
  expandedSections: string[];
  toggleSection: (section: string) => void;
  toggleFilter: (filter: string) => void;
  clearFilters: () => void;
  getFiltersForCategory: () => FilterGroup[];
}

export default function FiltersSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedFilters,
  expandedSections,
  toggleSection,
  toggleFilter,
  clearFilters,
  getFiltersForCategory,
}: FiltersSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          {selectedFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Category
            </h3>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedSections.includes("category") ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {expandedSections.includes("category") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2"
              >
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`block w-full text-left py-2 px-3 rounded text-sm transition-colors ${
                    selectedCategory === "All"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  All Products
                </button>
                {MENU_LINKS.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => setSelectedCategory(link.name)}
                    className={`block w-full text-left py-2 px-3 rounded text-sm transition-colors ${
                      selectedCategory === link.name
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Filters */}
        {selectedCategory !== "All" && getFiltersForCategory().map((filterGroup: FilterGroup, idx: number) => (
          <div key={idx} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
            <button
              onClick={() => toggleSection(filterGroup.title)}
              className="flex items-center justify-between w-full mb-3"
            >
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                {filterGroup.title}
              </h3>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedSections.includes(filterGroup.title) ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedSections.includes(filterGroup.title) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2"
                >
                  {filterGroup.items.map((item: string) => (
                    <label
                      key={item}
                      className="flex items-center py-1 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(item)}
                        onChange={() => toggleFilter(item)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                        {item}
                      </span>
                    </label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </aside>
  );
}