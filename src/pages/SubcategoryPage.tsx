import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home, SlidersHorizontal, X } from 'lucide-react';
import { allProducts } from '@/constants/allproducts';
import { MENU_LINKS } from '@/constants/menulink';

export default function SubcategoryPage() {
    const { category } = useParams();
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('featured');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    // Find category data
    const categoryData = MENU_LINKS.find(link =>
        link.name.toLowerCase().replace(/\s+/g, '-') === category
    );

    // Filter products by category
    const filteredProducts = allProducts.filter(product => {
        if (categoryData && product.category !== categoryData.name) return false;
        if (selectedFilters.length === 0) return true;
        return selectedFilters.some(filter =>
            product.name.toLowerCase().includes(filter.toLowerCase())
        );
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return parseFloat(a.price.replace(/[$,]/g, '')) - parseFloat(b.price.replace(/[$,]/g, ''));
            case 'price-high':
                return parseFloat(b.price.replace(/[$,]/g, '')) - parseFloat(a.price.replace(/[$,]/g, ''));
            case 'name':
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

    const clearFilters = () => setSelectedFilters([]);

    const availableFilters = categoryData?.megaMenu?.flatMap(section =>
        section.items.map(item => item.name)
    ) || [];

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="border-b bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                            <Home className="w-4 h-4" />
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <Link to="/allproducts" className="text-gray-600 hover:text-gray-900">
                            Products
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 font-medium">{categoryData?.name || category}</span>
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
                        {categoryData?.name || category}
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
                    {/* Desktop Sidebar */}
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

                            {availableFilters.length > 0 && (
                                <div className="space-y-2">
                                    {availableFilters.slice(0, 10).map(filter => (
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
                            )}
                        </div>
                    </motion.div>

                    {/* Products Grid */}
                    <main className="flex-1">
                        {/* Controls */}
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
                                <option value="name">Name: A-Z</option>
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

                        {/* Products */}
                        {sortedProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                        onMouseEnter={() => setHoveredId(product.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        className="group cursor-pointer"
                                        onClick={() => window.location.href = `/product/${product.id}`}
                                    >
                                        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                            <motion.img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                animate={{
                                                    scale: hoveredId === product.id ? 1.1 : 1,
                                                }}
                                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                            />
                                            <motion.div
                                                className="absolute inset-0 bg-black/10"
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    opacity: hoveredId === product.id ? 1 : 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 font-semibold">{product.price}</p>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg mb-4">No products found</p>
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
        </div>
    );
}
