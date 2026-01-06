import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Minus, Plus, ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { allProducts } from '@/constants/allproducts';

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = allProducts.find(p => p.id === Number(id));
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-light text-gray-900 mb-4">Product not found</h2>
                    <button
                        onClick={() => navigate('/allproducts')}
                        className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    // Mock multiple images - in real app, product would have multiple images
    const images = [product.image, product.image, product.image, product.image];

    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
            });
        }
        setIsAddedToCart(true);
        setTimeout(() => setIsAddedToCart(false), 2000);
    };

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
                        <span className="text-gray-900 font-medium truncate">{product.name}</span>
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Main Image */}
                        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                            <motion.img
                                key={selectedImage}
                                src={images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                        ? 'border-gray-900'
                                        : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-light text-gray-900 mb-4">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">(128 reviews)</span>
                        </div>

                        <div className="text-3xl font-normal text-gray-900 mb-8">{product.price}</div>

                        <div className="prose prose-sm text-gray-600 mb-8">
                            <p>
                                Experience luxury and comfort with this premium product. Crafted with attention
                                to detail and designed to elevate your space. Made from high-quality materials
                                that ensure durability and timeless style.
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-900 mb-3">Quantity</label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-6 py-3 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <motion.button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {isAddedToCart ? 'Added to Cart!' : 'Add to Cart'}
                            </motion.button>

                            <motion.button
                                className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-gray-900 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Heart className="w-5 h-5" />
                            </motion.button>

                            <motion.button
                                className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-gray-900 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Share2 className="w-5 h-5" />
                            </motion.button>
                        </div>

                        {/* Product Details */}
                        <div className="border-t pt-8">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
                            <dl className="space-y-3">
                                <div className="flex justify-between">
                                    <dt className="text-gray-600">Category</dt>
                                    <dd className="text-gray-900 font-medium">{product.category}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-600">SKU</dt>
                                    <dd className="text-gray-900 font-medium">OSM-{product.id}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-600">Availability</dt>
                                    <dd className="text-green-600 font-medium">In Stock</dd>
                                </div>
                            </dl>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-3xl font-light text-gray-900 mb-8">You May Also Like</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct, index) => (
                                <motion.div
                                    key={relatedProduct.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                        <img
                                            src={relatedProduct.image}
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                                        {relatedProduct.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 font-semibold">{relatedProduct.price}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
