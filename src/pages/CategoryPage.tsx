import { useState } from "react";
import { ChevronRight, Home, X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



export default function CategoryNavigationSystem() {
  const [currentView, setCurrentView] = useState("home");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [categoryHoveredId, setCategoryHoveredId] = useState(null);

  const navigateToCategory = (slug) => {
    const category = categories.find(c => c.slug === slug);
    setCurrentCategory(category);
    setCurrentView("category");
    setSelectedFilters([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {  
    setCurrentView("home");
    setCurrentCategory(null);
    setSelectedFilters([]);
  };

  const filteredProducts = allProducts.filter(p => {
    if (!currentCategory) return false;
    if (p.category !== currentCategory.slug) return false;
    if (selectedFilters.length === 0) return true;
    return selectedFilters.some(filter => p.filters.includes(filter.toLowerCase()));
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return parseFloat(a.price.replace(/[$,]/g, "")) - parseFloat(b.price.replace(/[$,]/g, ""));
    }
    if (sortBy === "price-high") {
      return parseFloat(b.price.replace(/[$,]/g, "")) - parseFloat(a.price.replace(/[$,]/g, ""));
    }
    return 0;
  });

  const toggleFilter = (filter) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const clearFilters = () => setSelectedFilters([]);

  const getAvailableFilters = () => {
    return currentCategory ? (filterOptions[currentCategory.slug] || []) : [];
  };

  // HOME VIEW - Categories Grid
  if (currentView === "home") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <motion.h1
              className="text-5xl md:text-6xl font-light text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Shop by Category
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Discover our curated collections
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="group relative overflow-hidden bg-gray-100 cursor-pointer"
                style={{ aspectRatio: "3/4" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setCategoryHoveredId(category.id)}
                onMouseLeave={() => setCategoryHoveredId(null)}
                onClick={() => navigateToCategory(category.slug)}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: categoryHoveredId === category.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 bg-black/20"
                  animate={{
                    opacity: categoryHoveredId === category.id ? 0.4 : 0.2,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="absolute inset-0 flex items-end p-6">
                  <motion.h3
                    className="text-white text-xl font-light tracking-wider uppercase"
                    animate={{
                      y: categoryHoveredId === category.id ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.name}
                  </motion.h3>
                </div>

                <motion.div
                  className="absolute bottom-6 left-6 h-0.5 bg-white"
                  initial={{ width: 0 }}
                  animate={{
                    width: categoryHoveredId === category.id ? "100px" : "0px",
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // CATEGORY VIEW - Products Grid
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={navigateToHome} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <Home className="w-4 h-4" />
              Home
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{currentCategory?.name}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-light text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {currentCategory?.name}
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {sortedProducts.length} products available
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <motion.div
            className="hidden lg:block w-64 shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24 bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                    Style
                  </h4>
                  <div className="space-y-2">
                    {getAvailableFilters().map(filter => (
                      <label key={filter} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(filter)}
                          onChange={() => toggleFilter(filter)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700 hover:text-gray-900">
                          {filter}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between mb-8 gap-4">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {selectedFilters.length > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs">
                    {selectedFilters.length}
                  </span>
                )}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Active Filters */}
            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedFilters.map(filter => (
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
            {sortedProducts.length > 0 ? (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="relative bg-gray-100 aspect-square overflow-hidden mb-4 rounded-lg">
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
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors rounded"
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

                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 font-semibold">
                      {product.price}
                    </p>

                    <motion.div
                      className="mt-2 h-0.5 bg-gray-900"
                      initial={{ width: 0 }}
                      animate={{
                        width: hoveredId === product.id ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg mb-4">No products found matching your filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
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
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
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
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button onClick={() => setMobileFilterOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                      Style
                    </h4>
                    <div className="space-y-2">
                      {getAvailableFilters().map(filter => (
                        <label key={filter} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes(filter)}
                            onChange={() => toggleFilter(filter)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            {filter}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedFilters.length > 0 && (
                  <button
                    onClick={() => {
                      clearFilters();
                      setMobileFilterOpen(false);
                    }}
                    className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}