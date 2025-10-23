import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80",
    title: "Luxury Living Spaces",
    subtitle: "Transform your home with elegant interior designs"
  },
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80",
    title: "Modern Comfort",
    subtitle: "Discover contemporary furniture and decor"
  },
  {
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80",
    title: "Timeless Elegance",
    subtitle: "Curated collections for every room"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    title: "Sky-High Standards",
    subtitle: "Where quality meets heavenly design"
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const navigate = useNavigate()

  const handleShopCollection = () => {
    navigate('/allproducts')
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          key={`content-${current}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="mb-4">
            <span className="text-sky-300 text-sm tracking-[0.3em] uppercase font-light">
              OSMON
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            {slides[current].title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light">
            {slides[current].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShopCollection}
              className="px-10 py-4 bg-white text-gray-900 rounded-sm font-medium text-lg hover:cursor-pointer hover:bg-gray-100 transition-colors shadow-2xl"
            >
              Shop Collection
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-transparent border-2 border-white text-white hover:cursor-pointer rounded-sm font-medium text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Explore More
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current 
                ? "bg-white w-12" 
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-6 top-1/2 hover:cursor-pointer -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        ←
      </button>
      
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-6 top-1/2 hover:cursor-pointer -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
      >
        →
      </button>
    </section>
  );
}