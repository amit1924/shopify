// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiHome,
//   FiLogIn,
//   FiUserPlus,
//   FiMenu,
//   FiX,
//   FiLogOut,
// } from "react-icons/fi";
// import AuthContext from "../context/userContext";

// const Navbar = ({ mobileMenuOpen, setMobileMenuOpen, handleLogout }) => {
//   return (
//     <nav className="bg-gray-800/80 backdrop-blur-md border-b border-emerald-500/20 shadow-lg shadow-emerald-500/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex-shrink-0 flex items-center"
//           >
//             <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
//               Shopify Dashboard
//             </span>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-4">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to="/"
//                   className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
//                 >
//                   <FiHome className="mr-2" /> Home
//                 </Link>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to="/login"
//                   className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
//                 >
//                   <FiLogIn className="mr-2" /> Login
//                 </Link>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to="/dashboard"
//                   className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
//                 >
//                   <FiUserPlus className="mr-2" /> Dashboard
//                 </Link>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to="/cart"
//                   className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
//                 >
//                   <FiLogIn className="mr-2" /> Cart
//                 </Link>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to="/checkout"
//                   className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
//                 >
//                   <FiLogIn className="mr-2" /> Checkout
//                 </Link>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <button
//                   onClick={handleLogout}
//                   className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
//                 >
//                   <FiLogIn className="mr-2" /> Logout
//                 </button>
//               </motion.div>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <motion.button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               whileTap={{ scale: 0.9 }}
//               className="inline-flex items-center justify-center p-2 rounded-md text-emerald-400 hover:text-white hover:bg-gray-700 focus:outline-none"
//               aria-expanded="false"
//             >
//               {mobileMenuOpen ? (
//                 <FiX className="h-6 w-6" />
//               ) : (
//                 <FiMenu className="h-6 w-6" />
//               )}
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-gray-800/95 border-t border-emerald-500/20 shadow-xl shadow-emerald-500/10"
//           >
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               <motion.div
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.1 }}
//               >
//                 <Link
//                   to="/"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center"
//                 >
//                   <FiHome className="mr-2 text-emerald-400" /> Home
//                 </Link>
//               </motion.div>
//               <motion.div
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <Link
//                   to="/login"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center"
//                 >
//                   <FiLogIn className="mr-2 text-emerald-400" /> Login
//                 </Link>
//               </motion.div>
//               <motion.div
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <Link
//                   to="/dashboard"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center"
//                 >
//                   <FiUserPlus className="mr-2 text-emerald-400" /> Dashboard
//                 </Link>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to="/cart"
//                   className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
//                 >
//                   <FiLogIn className="mr-2" /> Cart
//                 </Link>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to="/checkout"
//                   className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
//                 >
//                   <FiLogIn className="mr-2" /> Checkout
//                 </Link>
//               </motion.div>
//               <motion.div
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <button
//                   onClick={handleLogout}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center"
//                 >
//                   <FiLogOut className="mr-2 text-emerald-400" /> Logout
//                 </button>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
  FiLogOut,
  FiShoppingCart,
} from "react-icons/fi";
import { useCartStore } from "../store/useStore";

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen, handleLogout }) => {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-md border-b border-emerald-500/20 shadow-lg shadow-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 flex items-center"
          >
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 drop-shadow-neon">
              <span className="text-green-400">Shop</span>
              <span className="text-green-200">ify</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
                >
                  <FiHome className="mr-2" /> Home
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
                >
                  <FiLogIn className="mr-2" /> Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
                >
                  <FiUserPlus className="mr-2" /> Dashboard
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </motion.div>
            </div>
          </div>

          {/* Cart and Mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon - Always visible with real-time updates */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <Link
                to="/cart"
                className="p-2 rounded-full text-emerald-400 hover:text-white transition-all group relative"
              >
                <div className="relative">
                  <FiShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <motion.span
                      key={`cart-count-${totalItems}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </div>
                <span className="absolute opacity-0 group-hover:opacity-100 -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity duration-200">
                  {totalItems > 0 ? `${totalItems} items in cart` : "View Cart"}
                </span>
              </Link>
              {/* Neon shadow effect - more prominent when cart has items */}
              <div
                className={`absolute inset-0 rounded-full blur-md transition-all -z-10 ${
                  totalItems > 0
                    ? "bg-emerald-400/30 shadow-lg shadow-emerald-400/30"
                    : "bg-emerald-400/20 group-hover:bg-emerald-400/30"
                }`}
              />
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-emerald-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800/95 border-t border-emerald-500/20 shadow-xl shadow-emerald-500/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center"
                >
                  <FiHome className="mr-2 text-emerald-400" /> Home
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center"
                >
                  <FiLogIn className="mr-2 text-emerald-400" /> Login
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center"
                >
                  <FiUserPlus className="mr-2 text-emerald-400" /> Dashboard
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center"
                >
                  <FiLogOut className="mr-2 text-emerald-400" /> Logout
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
