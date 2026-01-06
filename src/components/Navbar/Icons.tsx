import { Heart, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";

export default function Icons() {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  return (
    <motion.div
      className="hidden md:flex items-center gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Link to="/login" className="p-2.5 rounded-full hover:bg-gray-100 transition-colors hover:cursor-pointer group">
        <User className="w-5 h-5 text-gray-700" />
      </Link>

      <Link to="/wishlist" className="p-2.5 rounded-full hover:bg-gray-100 transition-colors hover:cursor-pointer group relative">
        <Heart className="w-5 h-5 text-gray-700" />
        {wishlistCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
          >
            {wishlistCount > 9 ? '9+' : wishlistCount}
          </motion.span>
        )}
      </Link>

      <Link to="/cart" className="p-2.5 rounded-full hover:bg-gray-100 transition-colors group hover:cursor-pointer relative">
        <ShoppingBag className="w-5 h-5 text-gray-700" />
        {cartCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center"
          >
            {cartCount > 9 ? '9+' : cartCount}
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
}