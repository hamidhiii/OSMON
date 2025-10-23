import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { MENU_LINKS } from "@/constants/menulink";
import { allProducts } from "@/constants/allproducts";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["category"]);

  // Get filters based on selected category
  const getFiltersForCategory = () => {
    const category = MENU_LINKS.find(link => link.name === selectedCategory);
    return category?.megaMenu || [];
  };

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    if (selectedCategory !== "All" && product.category !== selectedCategory) {
      return false;
    }
    if (selectedFilters.length === 0) return true;
    
    return selectedFilters.some(filter => 
      Object.values(product).some(value => 
        String(value).toLowerCase().includes(filter.toLowerCase())
      )
    );
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price.replace(/[$,]/g, "")) - parseFloat(b.price.replace(/[$,]/g, ""));
      case "price-high":
        return parseFloat(b.price.replace(/[$,]/g, "")) - parseFloat(a.price.replace(/[$,]/g, ""));
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h1>
            <p className="text-gray-600 text-lg">
              {sortedProducts.length} products found
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
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
              {selectedCategory !== "All" && getFiltersForCategory().map((filterGroup, idx) => (
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
                        {filterGroup.items.map((item) => (
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

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filter Button & Sort */}
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

            {/* Active Filters */}
            {selectedFilters.length > 0 && (
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
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="group relative bg-white overflow-hidden cursor-pointer"
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Product Image */}
                    <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredId === product.id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />

                      <motion.div
                        className="absolute inset-0 bg-black/10"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredId === product.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      <motion.button
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredId === product.id ? 1 : 0,
                          y: hoveredId === product.id ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        Quick View
                      </motion.button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 text-left">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                        {product.category}
                      </p>
                      <h3 className="font-light text-gray-800 text-base mb-2 uppercase tracking-wide">
                        {product.name}
                      </h3>
                      <p className="text-gray-900 font-normal text-lg">
                        {product.price}
                      </p>
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gray-900"
                      initial={{ width: 0 }}
                      animate={{
                        width: hoveredId === product.id ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileFilterOpen(false)}
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
                  <button onClick={() => setMobileFilterOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {/* Same filter content as desktop */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}