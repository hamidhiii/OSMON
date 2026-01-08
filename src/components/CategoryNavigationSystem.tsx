import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

import { categories, type Category } from "../constants/categories";
import { allProducts } from "../constants/products";
import { filterOptions } from "../constants/filters";

import CategoryGrid from "./Category/CategoryGrid";
import Breadcrumb from "./Common/Breadcrumb";
import FilterSidebar from "./Category/FilterSidebar";
import FilterModal from "./Category/FilterModal";
import ProductGrid from "./Category/ProductGrid";

export type SortOption = "featured" | "price-low" | "price-high";

export default function CategoryNavigationSystem() {
  const [currentView, setCurrentView] = useState<"home" | "category">("home");
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // --- Навигация ---
  const navigateToCategory = (slug: string) => {
    const category = categories.find((c) => c.slug === slug);
    if (!category) return;
    setCurrentCategory(category);
    setCurrentView("category");
    setSelectedFilters([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    setCurrentView("home");
    setCurrentCategory(null);
    setSelectedFilters([]);
  };

  // --- Фильтрация и сортировка ---
  const filteredProducts = allProducts.filter((p) => {
    if (!currentCategory) return false;
    if (p.category !== currentCategory.slug) return false;
    if (selectedFilters.length === 0) return true;
    return selectedFilters.some((filter) =>
      p.filters.includes(filter.toLowerCase())
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.numericPrice - b.numericPrice;
    }
    if (sortBy === "price-high") {
      return b.numericPrice - a.numericPrice;
    }
    return 0;
  });

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => setSelectedFilters([]);

  const getAvailableFilters = (): string[] => {
    return currentCategory ? filterOptions[currentCategory.slug] || [] : [];
  };

  // --- Домашняя страница ---
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

          <CategoryGrid
            categories={categories}
            navigateToCategory={navigateToCategory}
          />
        </div>
      </div>
    );
  }

  // --- Страница категории ---
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb currentCategory={currentCategory} navigateToHome={navigateToHome} />

      {/* Заголовок */}
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

      {/* Контент */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <motion.div
            className="hidden lg:block w-64 shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FilterSidebar
              selectedFilters={selectedFilters}
              clearFilters={clearFilters}
              getAvailableFilters={getAvailableFilters}
              toggleFilter={toggleFilter}
            />
          </motion.div>

          {/* Товары */}
          <main className="flex-1">
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
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Активные фильтры */}
            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
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

            {/* Сетка товаров */}
            <ProductGrid
              sortedProducts={sortedProducts}
            />
          </main>
        </div>
      </div>

      <FilterModal
        mobileFilterOpen={mobileFilterOpen}
        setMobileFilterOpen={setMobileFilterOpen}
        selectedFilters={selectedFilters}
        clearFilters={clearFilters}
        getAvailableFilters={getAvailableFilters}
        toggleFilter={toggleFilter}
      />
    </div>
  );
}
