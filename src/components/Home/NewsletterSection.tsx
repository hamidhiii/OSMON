import { motion } from "framer-motion";
import { newsletterFeatures } from "@/constants/homeData";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function NewsletterSection() {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-2xl font-semibold mb-4">📬 Subscribe to Our Newsletter</h2>
      <p className="text-gray-600 mb-8">Stay updated with exclusive deals and new arrivals!</p>

      <motion.form
        className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Input placeholder="Enter your email" className="flex-1" />
        <Button>Subscribe</Button>
      </motion.form>

      <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {newsletterFeatures.map((feature, i) => (
          <motion.div
            key={feature.id}
            className="flex items-start gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <img src={feature.icon} alt={feature.title} className="w-10 h-10" />
            <div className="text-left">
              <h4 className="font-semibold">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
