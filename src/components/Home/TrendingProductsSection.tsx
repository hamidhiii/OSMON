import { trendingProducts } from "@/constants/homeData";
import { motion } from "framer-motion";
import { useState } from "react";



export default function TrendingProductsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-light text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Trending Now
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Most popular items this season
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trendingProducts.map((item, i) => (
            <motion.div
              key={item.id}
              className="group relative bg-white overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredId === item.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                
                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-black/10"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredId === item.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* View Product Button */}
                <motion.button
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredId === item.id ? 1 : 0,
                    y: hoveredId === item.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("View product:", item);
                  }}
                >
                  View Product
                </motion.button>
              </div>

              {/* Product Name */}
              <div className="p-4 text-center">
                <h3 className="font-light text-gray-800 text-base uppercase tracking-wide">
                  {item.name}
                </h3>
              </div>

              {/* Bottom border animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gray-900"
                initial={{ width: 0 }}
                animate={{
                  width: hoveredId === item.id ? "100%" : "0%",
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}