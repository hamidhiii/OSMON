import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { dailyDeals } from "@/constants/homeData";



const ProductSkeleton = () => (
  <div className="overflow-hidden bg-gray-100">
    <div className="relative w-full aspect-square bg-gray-200 animate-pulse" />
    <div className="p-4 space-y-2">
      <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
    </div>
  </div>
);

const CountdownTimer = ({ endTime }: { endTime: number }) => {
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = endTime - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (timeLeft <= 0) return <span className="text-xs">Expired</span>;

  return (
    <span className="text-xs font-medium">
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  );
};

export default function DailyDealsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(dailyDeals.length / itemsPerPage);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentItems = () => {
    const start = currentPage * itemsPerPage;
    return dailyDeals.slice(start, start + itemsPerPage);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-light text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Daily Deals
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Limited time offers - Hurry before they're gone
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(itemsPerPage)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getCurrentItems().map((product, index) => (
              <motion.div
                key={`${product.id}-${currentPage}`}
                className="group relative bg-white overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === product.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  
                  {/* Countdown Badge */}
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 font-medium">
                    <CountdownTimer endTime={product.endTime} />
                  </div>
                  
                  {/* Overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-black/10"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredId === product.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Quick Shop Button */}
                  <motion.button
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredId === product.id ? 1 : 0,
                      y: hoveredId === product.id ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Add to cart:", product);
                    }}
                  >
                    Add to Cart
                  </motion.button>
                </div>

                {/* Product Info */}
                <div className="p-4 text-left">
                  <h3 className="font-light text-gray-800 text-base mb-2 uppercase tracking-wide">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-red-600 font-medium text-lg">
                      {product.price}
                    </p>
                    <p className="text-gray-400 line-through text-sm">
                      {product.originalPrice}
                    </p>
                  </div>
                </div>

                {/* Bottom border animation */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-red-600"
                  initial={{ width: 0 }}
                  animate={{
                    width: hoveredId === product.id ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-10">
          <button 
            onClick={prevPage}
            className="w-12 h-12 border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button 
            onClick={nextPage}
            className="w-12 h-12 border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPage 
                  ? "bg-gray-800 w-8" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}