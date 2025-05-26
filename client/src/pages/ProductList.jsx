import React, { useState } from "react";
import { useCartStore } from "../store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiHeart,
  FiStar,
  FiLogIn,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/userContext";

const ProductList = ({ products }) => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // to add in cart first login

  if (!user) {
    return (
      <motion.div
        className="w-full h-screen flex items-center justify-center "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-center px-6 py-8 rounded-xl border border-purple-500/30 backdrop-blur-md bg-black/30 shadow-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ yoyo: Infinity, duration: 1.5 }}
          >
            Please log in to view products
          </motion.h2>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 inline-block"
          >
            <Link
              to="/login"
              className="group relative px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-purple-700 transition-all duration-300"
            >
              <FiLogIn className="inline-block mr-2" />
              Login
              {/* Glowing ring effect */}
              <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-400 to-indigo-400 blur-lg opacity-70 group-hover:opacity-100 transition-all duration-300 -z-10"></span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  const handleAddToCart = (product) => {
    // Normalize the product object to use _id as id
    const cartProduct = {
      ...product,
      id: product._id,
      quantity: 1,
    };
    addToCart(cartProduct);
    toast.success(`${product.title} added to cart!`, {
      position: "bottom-right",
      style: {
        background: "#1F2937",
        color: "#E5E7EB",
        border: "1px solid #6B7280",
        boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
      },
    });
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full overflow-x-hidden px-4 sm:px-6">
      {/* Search & Filter UI */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-full"
      >
        <div className="relative flex-grow w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-purple-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white w-full md:w-auto"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat} className="bg-gray-800">
              {cat}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-400 w-full"
        >
          <p className="text-xl">No products found matching your criteria</p>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            <AnimatePresence>
              {currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)",
                  }}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 group w-full relative"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Badge */}
                  {product.price < 50 && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                      SALE
                    </div>
                  )}

                  <Link to={`/products/${product._id}`} className="block">
                    <div className="h-48 overflow-hidden relative">
                      {product.images?.[0] && (
                        <motion.img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          animate={{
                            scale: hoveredProduct === product.id ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FiStar
                              key={star}
                              className={`text-sm ${
                                star <= Math.floor(Math.random() * 3) + 3
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-400"
                              }`}
                            />
                          ))}
                          <span className="text-white text-xs ml-1">
                            ({Math.floor(Math.random() * 100) + 20})
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link to={`/products/${product.id}`} className="block">
                      <h4 className="text-lg font-semibold text-white mb-2 truncate hover:text-purple-400 transition-colors">
                        {product.title}
                      </h4>
                    </Link>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-purple-400 font-bold text-xl">
                        ${product.price}
                      </p>
                      {product.price > 100 && (
                        <p className="text-gray-400 text-sm line-through">
                          ${(product.price * 1.2).toFixed(2)}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
                      >
                        <FiShoppingCart className="text-sm" /> Add
                      </motion.button>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          <FiHeart className="text-gray-300 hover:text-red-400 transition-colors" />
                        </motion.button>

                        <Link
                          to={`/products/${product._id}`}
                          className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                        >
                          <FiEye className="text-gray-300 hover:text-purple-400 transition-colors" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {filteredProducts.length > productsPerPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-between items-center mt-8 w-full gap-4"
            >
              <div className="text-gray-400 text-sm sm:text-base">
                Showing {indexOfFirstProduct + 1}-
                {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </div>

              <nav className="flex items-center gap-1 sm:gap-2">
                <motion.button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  whileTap={{ scale: 0.9 }}
                  className={`p-1 sm:p-2 rounded-md ${
                    currentPage === 1
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-purple-400 hover:bg-gray-700"
                  }`}
                >
                  <FiChevronLeft className="text-lg sm:text-xl" />
                </motion.button>

                {Array.from(
                  { length: totalPages > 5 ? 5 : totalPages },
                  (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <motion.button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`px-2 sm:px-3 py-1 rounded-md text-sm sm:text-base ${
                          currentPage === pageNumber
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "text-purple-400 hover:bg-gray-700"
                        }`}
                      >
                        {pageNumber}
                      </motion.button>
                    );
                  }
                )}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <motion.span
                    className="text-purple-400 px-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ...
                  </motion.span>
                )}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <motion.button
                    onClick={() => paginate(totalPages)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`px-2 sm:px-3 py-1 rounded-md text-sm sm:text-base ${
                      currentPage === totalPages
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "text-purple-400 hover:bg-gray-700"
                    }`}
                  >
                    {totalPages}
                  </motion.button>
                )}

                <motion.button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  whileTap={{ scale: 0.9 }}
                  className={`p-1 sm:p-2 rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-purple-400 hover:bg-gray-700"
                  }`}
                >
                  <FiChevronRight className="text-lg sm:text-xl" />
                </motion.button>
              </nav>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
