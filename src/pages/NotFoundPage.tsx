import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
    const popularCategories = [
        { name: 'Living Room', href: '/category/living-room' },
        { name: 'Bedroom', href: '/category/bedroom' },
        { name: 'Kitchen', href: '/category/kitchen' },
        { name: 'Office', href: '/category/office' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Animated 404 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                    className="mb-8"
                >
                    <motion.h1
                        className="text-[180px] md:text-[240px] font-light text-gray-900 leading-none"
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
                    >
                        404
                    </motion.h1>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                    <Link
                        to="/allproducts"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-lg font-medium hover:border-gray-900 transition-colors"
                    >
                        <Search className="w-5 h-5" />
                        Browse Products
                    </Link>
                </motion.div>

                {/* Popular Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <p className="text-sm text-gray-600 mb-4">Or explore our popular categories:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {popularCategories.map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                            >
                                <Link
                                    to={category.href}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-900 hover:text-white transition-all shadow-sm hover:shadow-md"
                                >
                                    {category.name}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-200 rounded-full opacity-20 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-300 rounded-full opacity-20 blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.25, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>
        </div>
    );
}
