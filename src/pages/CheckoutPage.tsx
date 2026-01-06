import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        country: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const validateShipping = () => {
        const newErrors: Record<string, string> = {};

        if (!shippingInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) newErrors.email = 'Email is invalid';
        if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone is required';
        if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
        if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
        if (!shippingInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        if (!shippingInfo.country.trim()) newErrors.country = 'Country is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinueToPayment = () => {
        if (validateShipping()) {
            setStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePlaceOrder = () => {
        // Simulate order placement
        setShowSuccess(true);
        setTimeout(() => {
            clearCart();
            navigate('/');
        }, 3000);
    };

    if (cart.length === 0 && !showSuccess) {
        navigate('/cart');
        return null;
    }

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    className="text-center px-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                        <CheckCircle2 className="w-24 h-24 text-green-600 mx-auto mb-6" />
                    </motion.div>
                    <h2 className="text-3xl font-light text-gray-900 mb-4">Order Placed Successfully!</h2>
                    <p className="text-gray-600 mb-2">Thank you for your purchase</p>
                    <p className="text-sm text-gray-500">Redirecting to homepage...</p>
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
                    Checkout
                </motion.h1>

                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                <Truck className="w-5 h-5" />
                            </div>
                            <span className={step >= 1 ? 'text-gray-900 font-medium' : 'text-gray-600'}>
                                Shipping
                            </span>
                        </div>
                        <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-gray-900' : 'bg-gray-200'}`} />
                        <div className="flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <span className={step >= 2 ? 'text-gray-900 font-medium' : 'text-gray-600'}>
                                Payment
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {step === 1 ? (
                            <motion.div
                                className="bg-white rounded-lg p-8"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Information</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={shippingInfo.fullName}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={shippingInfo.email}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            value={shippingInfo.phone}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address *
                                        </label>
                                        <input
                                            type="text"
                                            value={shippingInfo.address}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.address ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            value={shippingInfo.city}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.city ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            ZIP Code *
                                        </label>
                                        <input
                                            type="text"
                                            value={shippingInfo.zipCode}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Country *
                                        </label>
                                        <input
                                            type="text"
                                            value={shippingInfo.country}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.country ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                                    </div>
                                </div>

                                <button
                                    onClick={handleContinueToPayment}
                                    className="mt-8 w-full px-6 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Continue to Payment
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="bg-white rounded-lg p-8"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Method</h2>

                                <div className="space-y-4 mb-8">
                                    <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-gray-900 transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5"
                                        />
                                        <CreditCard className="w-6 h-6 text-gray-600" />
                                        <span className="font-medium">Credit / Debit Card</span>
                                    </label>

                                    <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-gray-900 transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5"
                                        />
                                        <span className="font-medium">PayPal</span>
                                    </label>

                                    <label className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-gray-900 transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5"
                                        />
                                        <span className="font-medium">Cash on Delivery</span>
                                    </label>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-900 rounded-lg font-medium hover:border-gray-900 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        className="flex-1 px-6 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </motion.div>
                        )}
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
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            ${(parseFloat(item.price.replace(/[$,]/g, '')) * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
