import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MENU_LINKS } from "@/constants/menulink";
import { allProducts } from "@/constants/allproducts";
import ProductsHeader from "@/components/AllProducts/ProductsHeader";
import FiltersSidebar from "@/components/AllProducts/FiltersSidebar";
import MobileFilterButton from "@/components/AllProducts/MobileFilterButton";
import ActiveFilters from "@/components/AllProducts/ActiveFilters";
import ProductsGrid from "@/components/AllProducts/ProductsGrid";
import MobileFilterModal from "@/components/AllProducts/MobileFilterModal";


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
      <ProductsHeader 
        selectedCategory={selectedCategory}
        productCount={sortedProducts.length}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <FiltersSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedFilters={selectedFilters}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            toggleFilter={toggleFilter}
            clearFilters={clearFilters}
            getFiltersForCategory={getFiltersForCategory}
          />

          {/* Main Content */}
          <main className="flex-1">
            <MobileFilterButton
              selectedFilters={selectedFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              setMobileFilterOpen={setMobileFilterOpen}
            />

            <ActiveFilters
              selectedFilters={selectedFilters}
              toggleFilter={toggleFilter}
            />

            <ProductsGrid
              sortedProducts={sortedProducts}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              clearFilters={clearFilters}
            />
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <MobileFilterModal
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedFilters={selectedFilters}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            toggleFilter={toggleFilter}
            clearFilters={clearFilters}
            getFiltersForCategory={getFiltersForCategory}
            onClose={() => setMobileFilterOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}