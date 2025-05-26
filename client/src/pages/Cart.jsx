// import React from "react";
// import { useCartStore } from "../store/useStore";
// import { motion } from "framer-motion";
// import {
//   FiTrash2,
//   FiShoppingBag,
//   FiArrowLeft,
//   FiMinus,
//   FiPlus,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const Cart = ({ isSidebar = false }) => {
//   const cart = useCartStore((state) => state.cart);
//   const addToCart = useCartStore((state) => state.addToCart);
//   const removeFromCart = useCartStore((state) => state.removeFromCart);
//   const deleteFromCart = useCartStore((state) => state.deleteFromCart);
//   const clearCart = useCartStore((state) => state.clearCart);

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleRemoveItem = (itemId, itemTitle) => {
//     deleteFromCart(itemId);
//     toast.error(`${itemTitle} removed from cart`, {
//       position: "bottom-right",
//       style: {
//         background: "#1F2937",
//         color: "#E5E7EB",
//         border: "1px solid #6B7280",
//         boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
//       },
//     });
//   };

//   const handleClearCart = () => {
//     clearCart();
//     toast.success("Cart cleared successfully!", {
//       position: "bottom-right",
//       style: {
//         background: "#1F2937",
//         color: "#E5E7EB",
//         border: "1px solid #6B7280",
//         boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
//       },
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className={`py-4 ${isSidebar ? "px-2" : "px-4 sm:px-6"}`}
//     >
//       {!isSidebar && (
//         <div className="flex items-center mb-6">
//           <Link
//             to="/"
//             className="mr-4 text-purple-400 hover:text-purple-300 transition-colors"
//           >
//             <FiArrowLeft size={24} />
//           </Link>
//           <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
//             Your Shopping Cart
//           </h1>
//         </div>
//       )}

//       {cart.length === 0 ? (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className={`flex flex-col items-center justify-center py-16 text-gray-400 ${
//             isSidebar ? "px-2" : ""
//           }`}
//         >
//           <FiShoppingBag size={isSidebar ? 32 : 48} className="mb-4" />
//           <p className={`${isSidebar ? "text-lg" : "text-xl"} mb-4`}>
//             Your cart is empty
//           </p>
//           {!isSidebar && (
//             <Link
//               to="/"
//               className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
//             >
//               Continue Shopping
//             </Link>
//           )}
//         </motion.div>
//       ) : (
//         <div
//           className={`grid grid-cols-1 ${
//             isSidebar ? "" : "lg:grid-cols-3"
//           } gap-4 sm:gap-6`}
//         >
//           <div className={`${isSidebar ? "" : "lg:col-span-2"}`}>
//             <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
//               {cart.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex flex-col xs:flex-row items-center p-3 sm:p-4 border-b border-gray-700 last:border-b-0"
//                 >
//                   <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-2 sm:mr-4 overflow-hidden rounded-lg">
//                     {item.images?.[0] && (
//                       <img
//                         src={item.images[0]}
//                         alt={item.title}
//                         className="w-full h-full object-cover"
//                       />
//                     )}
//                   </div>
//                   <div className="flex-grow text-center xs:text-left w-full xs:w-auto mt-2 xs:mt-0">
//                     <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 line-clamp-1">
//                       {item.title}
//                     </h4>
//                     <p className="text-purple-400 font-bold text-xs sm:text-sm md:text-base">
//                       ${item.price} × {item.quantity} = $
//                       {(item.price * item.quantity).toFixed(2)}
//                     </p>
//                   </div>

//                   <div className="flex items-center space-x-1 sm:space-x-2 mt-2 xs:mt-0 w-full xs:w-auto justify-between xs:justify-normal">
//                     <div className="flex items-center">
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="p-1 sm:p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
//                       >
//                         <FiMinus size={isSidebar ? 14 : 16} />
//                       </button>
//                       <span className="text-white font-bold mx-1 sm:mx-2 text-sm sm:text-base">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => addToCart({ ...item, quantity: 1 })}
//                         className="p-1 sm:p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
//                       >
//                         <FiPlus size={isSidebar ? 14 : 16} />
//                       </button>
//                     </div>

//                     <motion.button
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleRemoveItem(item.id, item.title)}
//                       className="px-2 sm:px-3 py-1 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center text-xs sm:text-sm"
//                     >
//                       <FiTrash2 className="mr-1" size={isSidebar ? 14 : 16} />
//                       {!isSidebar && "Remove"}
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {!isSidebar && (
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleClearCart}
//                 className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center text-sm sm:text-base"
//               >
//                 <FiTrash2 className="mr-2" /> Clear Cart
//               </motion.button>
//             )}
//           </div>

//           {!isSidebar && (
//             <div className="lg:col-span-1">
//               <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 sm:p-6">
//                 <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
//                   Order Summary
//                 </h2>
//                 <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
//                   <div className="flex justify-between py-1 sm:py-2 border-b border-gray-700">
//                     <span className="text-gray-400 text-sm sm:text-base">
//                       Subtotal
//                     </span>
//                     <span className="text-white text-sm sm:text-base">
//                       ${total.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between py-1 sm:py-2 border-b border-gray-700">
//                     <span className="text-gray-400 text-sm sm:text-base">
//                       Shipping
//                     </span>
//                     <span className="text-white text-sm sm:text-base">
//                       Free
//                     </span>
//                   </div>
//                   <div className="flex justify-between py-1 sm:py-2 border-b border-gray-700">
//                     <span className="text-gray-400 text-sm sm:text-base">
//                       Tax
//                     </span>
//                     <span className="text-white text-sm sm:text-base">
//                       ${(total * 0.1).toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between py-2 sm:py-4">
//                     <span className="text-base sm:text-lg font-bold text-white">
//                       Total
//                     </span>
//                     <span className="text-lg sm:text-xl font-bold text-purple-400">
//                       ${(total * 1.1).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>

//                 <Link
//                   to="/checkout"
//                   className="block w-full text-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity font-bold text-sm sm:text-base"
//                 >
//                   Proceed to Checkout
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default Cart;

import React from "react";
import { useCartStore } from "../store/useStore";
import { motion } from "framer-motion";
import {
  FiTrash2,
  FiShoppingBag,
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingCart,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Cart = ({ isSidebar = false }) => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const deleteFromCart = useCartStore((state) => state.deleteFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = (itemId, itemTitle) => {
    deleteFromCart(itemId);
    toast.error(`${itemTitle} removed from cart`, {
      position: "bottom-right",
      style: {
        background: "#1F2937",
        color: "#E5E7EB",
        border: "1px solid #6B7280",
        boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
      },
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully!", {
      position: "bottom-right",
      style: {
        background: "#1F2937",
        color: "#E5E7EB",
        border: "1px solid #6B7280",
        boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`py-4 ${isSidebar ? "px-2" : "px-4 sm:px-6"}`}
    >
      {!isSidebar && (
        <div className="flex items-center mb-6">
          <Link
            to="/"
            className="mr-4 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <FiArrowLeft size={24} />
          </Link>
          <div className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Your Shopping Cart
            </h1>
            {totalItems > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center"
              >
                <FiShoppingCart className="mr-1" size={14} />
                {totalItems}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex flex-col items-center justify-center py-16 text-gray-400 ${
            isSidebar ? "px-2" : ""
          }`}
        >
          <FiShoppingBag size={isSidebar ? 32 : 48} className="mb-4" />
          <p className={`${isSidebar ? "text-lg" : "text-xl"} mb-4`}>
            Your cart is empty
          </p>
          {!isSidebar && (
            <Link
              to="/"
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          )}
        </motion.div>
      ) : (
        <div
          className={`grid grid-cols-1 ${
            isSidebar ? "" : "lg:grid-cols-3"
          } gap-4 sm:gap-6`}
        >
          <div className={`${isSidebar ? "" : "lg:col-span-2"}`}>
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col xs:flex-row items-center p-3 sm:p-4 border-b border-gray-700 last:border-b-0"
                >
                  <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-2 sm:mr-4 overflow-hidden rounded-lg">
                    {item.images?.[0] && (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-grow text-center xs:text-left w-full xs:w-auto mt-2 xs:mt-0">
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-purple-400 font-bold text-xs sm:text-sm md:text-base">
                      ${item.price} × {item.quantity} = $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 sm:space-x-2 mt-2 xs:mt-0 w-full xs:w-auto justify-between xs:justify-normal">
                    <div className="flex items-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 sm:p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                      >
                        <FiMinus size={isSidebar ? 14 : 16} />
                      </button>
                      <span className="text-white font-bold mx-1 sm:mx-2 text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart({ ...item, quantity: 1 })}
                        className="p-1 sm:p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                      >
                        <FiPlus size={isSidebar ? 14 : 16} />
                      </button>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveItem(item.id, item.title)}
                      className="px-2 sm:px-3 py-1 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center text-xs sm:text-sm"
                    >
                      <FiTrash2 className="mr-1" size={isSidebar ? 14 : 16} />
                      {!isSidebar && "Remove"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {!isSidebar && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleClearCart}
                className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center text-sm sm:text-base"
              >
                <FiTrash2 className="mr-2" /> Clear Cart
              </motion.button>
            )}
          </div>

          {!isSidebar && (
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                  Order Summary
                </h2>
                <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                  <div className="flex justify-between py-1 sm:py-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm sm:text-base">
                      Items
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      {totalItems}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm sm:text-base">
                      Subtotal
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm sm:text-base">
                      Shipping
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between py-1 sm:py-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm sm:text-base">
                      Tax
                    </span>
                    <span className="text-white text-sm sm:text-base">
                      ${(total * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 sm:py-4">
                    <span className="text-base sm:text-lg font-bold text-white">
                      Total
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-purple-400">
                      ${(total * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full text-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity font-bold text-sm sm:text-base"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
