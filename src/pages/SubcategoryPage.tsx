import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Home, SlidersHorizontal, X, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { allProducts, type Product } from '@/constants/allproducts';
import { MENU_LINKS } from '@/constants/menulink';
import { useWishlist } from '@/context/WishlistContext';

export default function SubcategoryPage() {
    const { category } = useParams();
    // State for selected filters: { [sectionTitle]: [selectedItems] }
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
    const [sortBy, setSortBy] = useState('featured');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    // State to track expanded filter sections
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    // Find category data
    const categoryData = MENU_LINKS.find(link =>
        link.name.toLowerCase().replace(/\s+/g, '-') === category ||
        link.href === `/category/${category}` ||
        link.href === `/${category}`
    );

    const [searchParams] = useSearchParams();
    const initialFilter = searchParams.get('filter');

    // Initialize expanded sections and selected filters from URL
    useEffect(() => {
        if (categoryData?.megaMenu) {
            const initialExpanded: Record<string, boolean> = {};
            const initialSelected: Record<string, string[]> = {};

            categoryData.megaMenu.forEach(section => {
                initialExpanded[section.title] = true;

                // Check if the URL filter matches any item in this section
                if (initialFilter && section.items.includes(initialFilter)) {
                    initialSelected[section.title] = [initialFilter];
                }
            });

            setExpandedSections(initialExpanded);
            if (Object.keys(initialSelected).length > 0) {
                setSelectedFilters(initialSelected);
            }
        }
    }, [categoryData, initialFilter]);

    // Helper to map section title to product property
    const getPropertyForSection = (title: string): keyof Product | 'type' | null => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('color')) return 'color';
        if (lowerTitle.includes('brand')) return 'brand';
        if (lowerTitle.includes('size')) return 'size';
        if (lowerTitle.includes('material')) return 'material';
        if (lowerTitle.includes('style')) return 'subcategory';
        if (lowerTitle === 'categories') return 'subcategory';
        // Default fallback for "Living Room", "Bedroom", etc. which usually contain types
        return 'type';
    };

    // Filter products
    const filteredProducts = allProducts.filter(product => {
        // 1. Filter by main category
        if (categoryData && product.category !== categoryData.name) return false;

        // 2. Filter by selected attributes
        // Logic: AND across sections, OR within sections
        const sections = Object.keys(selectedFilters);
        if (sections.length === 0) return true;

        return sections.every(sectionTitle => {
            const selectedItems = selectedFilters[sectionTitle];
            if (selectedItems.length === 0) return true;

            const property = getPropertyForSection(sectionTitle);

            // If we can't map to a specific property, check all relevant properties
            if (!property) {
                return selectedItems.some(item =>
                    Object.values(product).some(val =>
                        typeof val === 'string' && (val as string).toLowerCase() === item.toLowerCase()
                    )
                );
            }

            // Check specific property
            const productValue = product[property];
            if (!productValue) return false;

            return selectedItems.some(item =>
                String(productValue).toLowerCase() === item.toLowerCase()
            );
        });
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

    const toggleFilter = (sectionTitle: string, item: string) => {
        setSelectedFilters(prev => {
            const sectionFilters = prev[sectionTitle] || [];
            const isSelected = sectionFilters.includes(item);

            if (isSelected) {
                const newSectionFilters = sectionFilters.filter(i => i !== item);
                if (newSectionFilters.length === 0) {
                    const { [sectionTitle]: _, ...rest } = prev;
                    return rest;
                }
                return { ...prev, [sectionTitle]: newSectionFilters };
            } else {
                return { ...prev, [sectionTitle]: [...sectionFilters, item] };
            }
        });
    };

    const clearFilters = () => setSelectedFilters({});

    const toggleSection = (title: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const totalActiveFilters = Object.values(selectedFilters).reduce((acc, curr) => acc + curr.length, 0);

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
                        <div className="sticky top-24 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                                {totalActiveFilters > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                {categoryData?.megaMenu?.map((section, idx) => (
                                    <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                                        <button
                                            onClick={() => toggleSection(section.title)}
                                            className="flex items-center justify-between w-full text-left mb-2 group"
                                        >
                                            <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {section.title}
                                            </span>
                                            {expandedSections[section.title] ? (
                                                <ChevronUp className="w-4 h-4 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 text-gray-400" />
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {expandedSections[section.title] && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="space-y-2 pt-2">
                                                        {section.items.map((item) => (
                                                            <label key={item} className="flex items-center cursor-pointer group">
                                                                <div className="relative flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedFilters[section.title]?.includes(item) || false}
                                                                        onChange={() => toggleFilter(section.title, item)}
                                                                        className="peer w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 transition-colors"
                                                                    />
                                                                </div>
                                                                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                                                    {item}
                                                                </span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
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
                                {totalActiveFilters > 0 && (
                                    <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs">
                                        {totalActiveFilters}
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
                        {totalActiveFilters > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {Object.entries(selectedFilters).flatMap(([section, items]) =>
                                    items.map(item => (
                                        <motion.span
                                            key={`${section}-${item}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-100"
                                        >
                                            <span className="font-medium">{item}</span>
                                            <button
                                                onClick={() => toggleFilter(section, item)}
                                                className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </motion.span>
                                    ))
                                )}
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
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (isInWishlist(product.id)) {
                                                        removeFromWishlist(product.id);
                                                    } else {
                                                        addToWishlist({
                                                            id: product.id,
                                                            name: product.name,
                                                            price: product.price,
                                                            image: product.image,
                                                            category: product.category
                                                        });
                                                    }
                                                }}
                                                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
                                            >
                                                <Heart
                                                    className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                                                />
                                            </button>
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-900 font-semibold">{product.price}</p>
                                            {product.brand && (
                                                <p className="text-xs text-gray-500">{product.brand}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <p className="text-gray-500 text-lg mb-4">No products found matching your filters</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {mobileFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileFilterOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white z-50 lg:hidden shadow-xl overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                                    <button
                                        onClick={() => setMobileFilterOpen(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {categoryData?.megaMenu?.map((section, idx) => (
                                        <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                                            <h4 className="font-medium text-gray-900 mb-3">{section.title}</h4>
                                            <div className="space-y-3">
                                                {section.items.map((item) => (
                                                    <label key={item} className="flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedFilters[section.title]?.includes(item) || false}
                                                            onChange={() => toggleFilter(section.title, item)}
                                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                                        />
                                                        <span className="ml-3 text-sm text-gray-600">
                                                            {item}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={() => {
                                            clearFilters();
                                            setMobileFilterOpen(false);
                                        }}
                                        className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors mb-3"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={() => setMobileFilterOpen(false)}
                                        className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        Show {filteredProducts.length} Results
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
