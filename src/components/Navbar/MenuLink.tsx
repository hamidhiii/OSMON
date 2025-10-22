import { MENU_LINKS } from "@/constants/menulink";
import { motion } from "framer-motion";

interface MenuLinkProps {
  activeLink: string;
  setActiveLink: (name: string) => void;
  setHoveredMenu: (name: string | null) => void;
}

export default function MenuLink({ activeLink, setActiveLink, setHoveredMenu }: MenuLinkProps) {
  return (
    <motion.div
      className="hidden md:block border-t border-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center gap-8 py-3">
          {MENU_LINKS.map((link) => (
            <li 
              key={link.name}
              onMouseEnter={() => setHoveredMenu(link.name)}
              onMouseLeave={() => setHoveredMenu(null)}
              className="relative"
            >
              <a
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                className={`text-sm font-medium transition-colors relative ${
                  activeLink === link.name
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.name}
                {activeLink === link.name && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute -bottom-3 left-0 right-0 h-0.5 bg-blue-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}