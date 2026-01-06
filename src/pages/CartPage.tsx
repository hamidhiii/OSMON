import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
    const navigate = useNavigate();

    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    className="text-center px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                    <h2 className="text-3xl font-light text-gray-900 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">
                        Looks like you haven't added anything to your cart yet
                    </p>
                    <Link
                        to="/allproducts"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Continue Shopping
                        <ArrowRight className="w-5 h-5" />
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
                    Shopping Cart ({getCartCount()} items)
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="bg-white rounded-lg p-6 flex gap-6"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                                {/* Product Image */}
                                <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {item.category && (
                                        <p className="text-sm text-gray-600 mb-4">{item.category}</p>
                                    )}

                                    <div className="flex items-center justify-between">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center border border-gray-300 rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 hover:bg-gray-50 transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:bg-gray-50 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right">
                                            <p className="text-lg font-semibold text-gray-900">
                                                ${(parseFloat(item.price.replace(/[$,]/g, '')) * item.quantity).toFixed(2)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {item.price} each
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-white rounded-lg p-6 sticky top-24">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (10%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {subtotal < 100 && (
                                <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                                    </p>
                                </div>
                            )}

                            <motion.button
                                onClick={() => navigate('/checkout')}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>

                            <Link
                                to="/allproducts"
                                className="block text-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
