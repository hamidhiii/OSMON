import { MENU_LINKS } from "@/constants/menulink";
import { motion, AnimatePresence } from "framer-motion";

interface MegaMenuProps {
  hoveredMenu: string | null;
  setHoveredMenu: (name: string | null) => void;
}

export default function MegaMenu({ hoveredMenu, setHoveredMenu }: MegaMenuProps) {
  const currentMenu = MENU_LINKS.find(link => link.name === hoveredMenu);

  return (
    <AnimatePresence>
      {hoveredMenu && currentMenu && (
        <motion.div
          className="hidden md:block fixed top-[134px] left-0 right-0 bg-white border-t border-b border-gray-200 shadow-lg z-40"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setHoveredMenu(hoveredMenu)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-4 gap-8">
              {currentMenu.megaMenu.map((column, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                    {column.title}
                  </h3>
                  <ul className="space-y-2">
                    {column.items.map((item, i) => (
                      <li key={i}>
                        <a 
                          href="#" 
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors block py-1"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {/* Featured Image Column */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={currentMenu.featuredImage} 
                  alt="Featured" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}