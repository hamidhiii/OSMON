import { motion } from "framer-motion";
import Logo from "./Logo";
import MenuLink from "./MenuLink";
import SearchBox from "./SearchBox";
import Icons from "./Icons";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <motion.nav
      className="flex items-center justify-between px-6 py-3 bg-gray-50 shadow-sm relative"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Logo />

      <motion.div
        className="hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <MenuLink />
      </motion.div>

      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <SearchBox />
        <Icons />
        <MobileMenu />
      </motion.div>
    </motion.nav>
  );
}
