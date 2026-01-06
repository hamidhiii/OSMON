import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (item: typeof wishlist[0]) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
        });
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    className="text-center px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                    <h2 className="text-3xl font-light text-gray-900 mb-4">Your wishlist is empty</h2>
                    <p className="text-gray-600 mb-8">
                        Save items you love to your wishlist
                    </p>
                    <Link
                        to="/allproducts"
                        className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <motion.h1
                    className="text-4xl font-light text-gray-900 mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    My Wishlist ({wishlist.length} items)
                </motion.h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            {/* Product Image */}
                            <Link to={`/product/${item.id}`} className="block relative aspect-square bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromWishlist(item.id);
                                    }}
                                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors shadow-md"
                                >
                                    <Trash2 className="w-5 h-5 text-red-600" />
                                </button>
                            </Link>

                            {/* Product Info */}
                            <div className="p-4">
                                <Link to={`/product/${item.id}`}>
                                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 hover:text-gray-600">
                                        {item.name}
                                    </h3>
                                </Link>
                                {item.category && (
                                    <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                                )}
                                <p className="text-lg font-semibold text-gray-900 mb-4">{item.price}</p>

                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
