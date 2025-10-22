import { useState } from "react";
import { Menu, X, Heart, ShoppingBag, User, ChevronRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_LINKS } from "@/constants/menulink";

interface MobileMenuProps {
  activeLink: string;
  setActiveLink: (name: string) => void;
}

export default function MobileMenu({ setActiveLink }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const currentMenu = MENU_LINKS.find(link => link.name === selectedMenu);

  const handleBack = () => {
    setSelectedMenu(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMenu(null);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-white z-40 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Main Menu */}
            {!selectedMenu && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-gray-800">Menu</h2>
                  <button onClick={handleClose} className="p-2">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-1">
                  {MENU_LINKS.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => setSelectedMenu(link.name)}
                      className="w-full flex items-center justify-between py-4 border-b border-gray-200 group"
                    >
                      <span className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        {link.name}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Submenu */}
            {selectedMenu && currentMenu && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="p-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <button 
                    onClick={handleBack}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-medium text-gray-800">
                    {selectedMenu}
                  </h2>
                  <button onClick={handleClose} className="p-2">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                  {currentMenu.megaMenu.map((category, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                        {category.title}
                      </h3>
                      <ul className="space-y-2">
                        {category.items.map((item, i) => (
                          <li key={i}>
                            <a
                              href="#"
                              onClick={handleClose}
                              className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Bottom Icons - Only on main menu */}
            {!selectedMenu && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4"
              >
                <div className="flex items-center justify-around">
                  <button className="flex flex-col items-center gap-1 text-gray-700">
                    <Heart className="w-5 h-5" />
                    <span className="text-xs">Wishlist</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 text-gray-700">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="text-xs">Cart</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 text-gray-700">
                    <User className="w-5 h-5" />
                    <span className="text-xs">Account</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}