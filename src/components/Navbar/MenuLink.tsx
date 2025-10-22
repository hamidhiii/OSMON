import { NavLink } from "react-router-dom";
import { MENU_LINKS } from "@/constants/menulink";
import { motion } from "framer-motion";

interface MenuLinkProps {
    isMobile?: boolean;
    onClick?: () => void; // ← теперь необязательно
  }
  
export default function MenuLink({ isMobile = false, onClick }: MenuLinkProps) {
  return (
    <ul
      className={`flex ${
        isMobile ? "flex-col gap-4" : "items-center gap-6"
      } text-gray-700`}
    >
      {MENU_LINKS.map(({ name, href }, index) => (
        <motion.li
          key={name}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <NavLink
            to={href}
            onClick={onClick}
            className={({ isActive }) =>
              `relative text-sm transition-colors duration-200 ${
                isActive ? "text-black font-medium" : "hover:text-black"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {name}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-[-3px] left-0 w-full h-[1.5px] bg-black origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </>
            )}
          </NavLink>
        </motion.li>
      ))}
    </ul>
  );
}
