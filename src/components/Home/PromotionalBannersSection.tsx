import { motion } from "framer-motion";
import { useState } from "react";

export default function PromotionalBannersSection() {
  const [hoveredBanner, setHoveredBanner] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="w-full space-y-0">
        <motion.div
          className="relative w-full h-[600px] overflow-hidden cursor-pointer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => setHoveredBanner(2)}
          onMouseLeave={() => setHoveredBanner(null)}
        >
          <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Text */}
            <div className="bg-[#b8a390] flex flex-col items-center justify-center text-center text-white px-8 md:px-16 py-12">
              <motion.h2
                className="text-4xl md:text-6xl font-light mb-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ fontFamily: 'serif' }}
              >
                Trade & Bulk
              </motion.h2>
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p className="text-lg font-light">
                  Have a project? We have a plan.
                </p>
                <p className="text-lg font-light">
                  We'll create a seamless shopping experience to
                  <br />
                  help bring your vision to life.
                </p>
                <p className="text-base font-light">
                  Reach out for exclusive trade and bulk order
                  <br />
                  discounts for your business, client, or event.
                </p>
              </motion.div>
              <motion.button
                className="px-10 py-3 border-2 border-white hover:cursor-pointer text-white font-light tracking-wider uppercase hover:bg-white hover:text-[#b8a390] transition-all duration-300 rounded-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                Learn more
              </motion.button>
            </div>

            {/* Right Side - Image */}
            <motion.div
              className="relative h-full"
              animate={{
                scale: hoveredBanner === 2 ? 1.05 : 1,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80"
                alt="Trade & Bulk"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          className="fixed bottom-8 right-8 w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg z-50"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </div>
    </section>
  );
} 