import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import Icons from "./Icons";
import MenuLink from "./MenuLink";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Market');
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            <Logo />
            <SearchBox />
            <div className="flex items-center gap-2">
              <Icons />
              <MobileMenu 
                activeLink={activeLink} 
                setActiveLink={setActiveLink} 
              />
            </div>
          </div>
        </div>

        {/* Desktop Menu Links */}
        <MenuLink 
          activeLink={activeLink} 
          setActiveLink={setActiveLink}
          setHoveredMenu={setHoveredMenu}
        />
      </motion.nav>

      {/* Mega Menu */}
      <MegaMenu 
        hoveredMenu={hoveredMenu} 
        setHoveredMenu={setHoveredMenu} 
      />

      {/* Spacer for fixed navbar */}
      <div className="h-32 md:h-36" />
    </>
  );
}