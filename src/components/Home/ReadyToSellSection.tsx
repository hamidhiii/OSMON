import { motion } from "framer-motion";
import { socialLinks } from "@/constants/homeData";
import { Button } from "../ui/button";

export default function ReadyToSellSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-center rounded-3xl mt-16">
      <motion.h2
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Ready to Sell Your Products?
      </motion.h2>
      <motion.p
        className="text-lg mb-8 opacity-90"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Join thousands of sellers and start your business journey today.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button className="bg-white text-indigo-600 font-semibold hover:bg-gray-200">
          Start Selling
        </Button>
      </motion.div>

      <div className="flex justify-center gap-6 mt-10">
        {socialLinks.map((link, i) => (
          <motion.img
            key={link.id}
            src={link.icon}
            alt={link.alt}
            className="w-8 h-8 cursor-pointer hover:scale-110 transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    </section>
  );
}
