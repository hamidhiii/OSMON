import { motion } from "framer-motion";
import { useState } from "react";

export default function PromotionalBanner() {
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
          onMouseEnter={() => setHoveredBanner(1)}
          onMouseLeave={() => setHoveredBanner(null)}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: hoveredBanner === 1 ? 1.05 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1920&q=80"
              alt="Holiday Collection"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <motion.h2
              className="text-5xl md:text-7xl font-light tracking-wide mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              GOOD TIDINGS ARE COMING
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl font-light mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Festive season starts whenever the spirit moves you. Go ahead, suit your fancy.
            </motion.p>
            <motion.button
              className="px-10 py-3 border-2 border-white text-white hover:cursor-pointer font-light tracking-wider uppercase hover:bg-white hover:text-gray-900 transition-all duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              Shop Holiday
            </motion.button>
          </div>
        </motion.div>
    </div>
    </section>
  )
}