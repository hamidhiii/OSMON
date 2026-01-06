import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Package, LogOut } from 'lucide-react';

export default function ProfilePage() {
    const navigate = useNavigate();

    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10013',
    };

    const orders = [
        {
            id: 'ORD-001',
            date: '2026-01-03',
            total: '$245.00',
            status: 'Delivered',
            items: 3,
        },
        {
            id: 'ORD-002',
            date: '2025-12-28',
            total: '$189.50',
            status: 'In Transit',
            items: 2,
        },
        {
            id: 'ORD-003',
            date: '2025-12-15',
            total: '$320.00',
            status: 'Delivered',
            items: 4,
        },
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <motion.h1
                    className="text-4xl font-light text-gray-900 mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    My Account
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Info */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-white rounded-lg p-6 mb-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-light">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                                    <p className="text-gray-600">Member since 2025</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail className="w-5 h-5" />
                                    <span className="text-sm">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Phone className="w-5 h-5" />
                                    <span className="text-sm">{user.phone}</span>
                                </div>
                                <div className="flex items-start gap-3 text-gray-600">
                                    <MapPin className="w-5 h-5 mt-0.5" />
                                    <span className="text-sm">{user.address}</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                                Edit Profile
                            </button>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </motion.div>

                    {/* Order History */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Package className="w-6 h-6 text-gray-900" />
                                <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
                            </div>

                            <div className="space-y-4">
                                {orders.map((order, index) => (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                        className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">Order {order.id}</h3>
                                                <p className="text-sm text-gray-600">Placed on {order.date}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div className="text-sm text-gray-600">
                                                {order.items} item{order.items > 1 ? 's' : ''}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-lg font-semibold text-gray-900">{order.total}</span>
                                                <button className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {orders.length === 0 && (
                                <div className="text-center py-12">
                                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-4">No orders yet</p>
                                    <button
                                        onClick={() => navigate('/allproducts')}
                                        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
