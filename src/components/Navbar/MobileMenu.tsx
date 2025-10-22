import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MenuLink from "./MenuLink";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <motion.button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-gray-100"
        whileTap={{ scale: 0.9 }}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-14 left-0 right-0 bg-white shadow-md border-t p-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <MenuLink isMobile onClick={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
