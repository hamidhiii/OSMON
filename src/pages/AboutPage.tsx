import { motion } from 'framer-motion';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

export default function AboutPage() {
    const values = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To provide exceptional quality products that enhance everyday living',
        },
        {
            icon: Users,
            title: 'Customer First',
            description: 'Your satisfaction is our top priority in everything we do',
        },
        {
            icon: Award,
            title: 'Quality Assured',
            description: 'Every product is carefully selected and tested for excellence',
        },
        {
            icon: TrendingUp,
            title: 'Innovation',
            description: 'Constantly evolving to bring you the latest and best',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-gradient-to-br from-gray-900 to-gray-700">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative h-full flex items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-light text-white mb-6">About OSMON</h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                            Elevating your lifestyle with premium products and exceptional service
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-4xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-light text-gray-900 mb-6">Our Story</h2>
                    <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                        <p>
                            Founded with a passion for quality and design, OSMON has been serving customers
                            with premium products since our inception. We believe that every home deserves
                            beautiful, functional pieces that stand the test of time.
                        </p>
                        <p>
                            Our journey began with a simple idea: to make luxury accessible. Today, we're
                            proud to offer a curated selection of products that combine elegance with
                            practicality, all at prices that won't break the bank.
                        </p>
                        <p>
                            Every item in our collection is handpicked by our team of experts who understand
                            the importance of quality, craftsmanship, and timeless design.
                        </p>
                    </div>
                </motion.div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="p-8 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <value.icon className="w-12 h-12 text-gray-900 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    <div>
                        <div className="text-4xl font-light text-gray-900 mb-2">10K+</div>
                        <div className="text-gray-600">Happy Customers</div>
                    </div>
                    <div>
                        <div className="text-4xl font-light text-gray-900 mb-2">500+</div>
                        <div className="text-gray-600">Products</div>
                    </div>
                    <div>
                        <div className="text-4xl font-light text-gray-900 mb-2">50+</div>
                        <div className="text-gray-600">Countries</div>
                    </div>
                    <div>
                        <div className="text-4xl font-light text-gray-900 mb-2">99%</div>
                        <div className="text-gray-600">Satisfaction</div>
                    </div>
                </motion.div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-light mb-6">
                            Ready to Transform Your Space?
                        </h2>
                        <p className="text-gray-300 text-lg mb-8">
                            Explore our collection and find the perfect pieces for your home
                        </p>
                        <a
                            href="/allproducts"
                            className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                            Shop Now
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
