import { blogPosts } from "@/constants/homeData";
import { motion } from "framer-motion";
import { useState } from "react";



export default function BlogSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
            From Our Blog
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Stories, tips, and inspiration for your home
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              className="group relative bg-white overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredId === post.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                
                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-black/10"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredId === post.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Read More Button */}
                <motion.button
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 hover:cursor-pointer bg-white text-gray-900 px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredId === post.id ? 1 : 0,
                    y: hoveredId === post.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Read article:", post);
                  }}
                >
                  Read More
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-light text-gray-900 text-xl mb-3 uppercase tracking-wide">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Bottom border animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gray-900"
                initial={{ width: 0 }}
                animate={{
                  width: hoveredId === post.id ? "100%" : "0%",
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}