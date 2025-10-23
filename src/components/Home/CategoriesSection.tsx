import { categories } from "@/constants/homeData";
import { motion } from "framer-motion";
import { useState } from "react";



export default function CategoriesSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  const itemsPerPage = 4;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentItems = () => {
    const start = currentPage * itemsPerPage;
    return categories.slice(start, start + itemsPerPage);
  };

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
            Holiday hosting made easy.
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Discover our curated collections
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getCurrentItems().map((category, index) => (
            <motion.div
              key={`${category.id}-${currentPage}`}
              className="group relative overflow-hidden bg-gray-100 cursor-pointer"
              style={{ aspectRatio: "3/4" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: hoveredId === category.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-black/20"
                animate={{
                  opacity: hoveredId === category.id ? 0.4 : 0.2,
                }}
                transition={{ duration: 0.3 }}
              />

              <div className="absolute inset-0 flex items-end p-6">
                <motion.h3
                  className="text-white text-xl font-light tracking-wider uppercase"
                  animate={{
                    y: hoveredId === category.id ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {category.name}
                </motion.h3>
              </div>

              <motion.div
                className="absolute bottom-6 left-6 h-0.5 bg-white"
                initial={{ width: 0 }}
                animate={{
                  width: hoveredId === category.id ? "100px" : "0px",
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-10">
          <button 
            onClick={prevPage}
            className="w-12 h-12 border-2 border-gray-300 flex hover:cursor-pointer items-center justify-center hover:bg-gray-100 transition-colors"
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
            className="w-12 h-12 border-2 border-gray-300 flex hover:cursor-pointer items-center justify-center hover:bg-gray-100 transition-colors"
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