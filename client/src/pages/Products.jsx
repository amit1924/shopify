import React, { useEffect, useState } from "react";
import API_URL from "../config/api";
import ProductList from "./ProductList";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLoader,
  FiAlertCircle,
  FiChevronDown,
  FiFilter,
} from "react-icons/fi";
import { FaFire, FaRocket, FaRegGem } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`${API_URL}/api/products`);
  //       if (!response.ok) throw new Error("Network response was not ok");
  //       const data = await response.json();

  //       // Enhance products with additional data for demo purposes
  //       const enhancedProducts = data.map((product) => ({
  //         ...product,
  //         trending: Math.random() > 0.7,
  //         premium: Math.random() > 0.9,
  //         rating: (Math.random() * 2 + 3).toFixed(1),
  //         reviews: Math.floor(Math.random() * 500),
  //         discount:
  //           Math.random() > 0.6 ? Math.floor(Math.random() * 30) + 10 : 0,
  //       }));

  //       setProducts(enhancedProducts);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(`Fetched products:`, data);

        const enhancedProducts = data.map((product) => ({
          ...product,
          trending: Math.random() > 0.7,
          premium: Math.random() > 0.9,
          rating: (Math.random() * 2 + 3).toFixed(1),
          reviews: Math.floor(Math.random() * 500),
          discount:
            Math.random() > 0.6 ? Math.floor(Math.random() * 30) + 10 : 0,
        }));

        setProducts(enhancedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [refreshTrigger]); // Add refreshTrigger as dependency

  // Create a function to trigger refresh
  const refreshProducts = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const filteredProducts = products.filter((product) => {
    if (activeTab === "trending" && !product.trending) return false;
    if (activeTab === "premium" && !product.premium) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;
    return true;
  });

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-96"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
          className="mb-4"
        >
          <FiLoader className="text-6xl text-purple-500" />
        </motion.div>
        <motion.p
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="text-xl text-purple-200"
        >
          Loading our premium collection...
        </motion.p>
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-64 text-red-400"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <FiAlertCircle className="text-5xl mb-4" />
        </motion.div>
        <p className="text-xl mb-2">Oops! Something went wrong</p>
        <p className="text-sm text-gray-400">Error: {error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-4 py-2 bg-purple-600 rounded-lg text-white"
          onClick={() => window.location.reload()}
        >
          Try Again
        </motion.button>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8 px-4 sm:px-6 max-w-7xl mx-auto mt-[75px]"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mb-12 h-64 sm:h-80">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-900 to-pink-700"
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000')] bg-cover bg-center opacity-20" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-100"
          >
            Discover Our Collection
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-purple-100 max-w-2xl"
          >
            Explore premium products with exclusive discounts and fast delivery
          </motion.p>
        </div>
      </div>

      {/* Category Tabs */}
      <motion.div
        className="flex flex-wrap gap-2 mb-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-white"
        >
          <FiFilter />
          Filters
          <FiChevronDown
            className={`transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Products", icon: null },
            {
              id: "trending",
              label: "Trending",
              icon: <FaFire className="text-orange-500" />,
            },
            {
              id: "premium",
              label: "Premium",
              icon: <FaRegGem className="text-blue-400" />,
            },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full mt-4 bg-gray-800 rounded-xl p-4 overflow-hidden"
            >
              <h3 className="text-lg font-semibold mb-4 text-white">
                Price Range
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="w-full accent-purple-500"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-purple-500"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl p-6 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-600 rounded-full opacity-20"></div>
        <div className="absolute -right-20 top-1/2 w-64 h-64 bg-pink-600 rounded-full opacity-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              <span className="inline-block mr-2">
                <FaRocket className="text-yellow-300" />
              </span>
              Flash Sale!
            </h2>
            <p className="text-purple-100 max-w-lg">
              Limited time offers on our most popular products. Don't miss out
              on these exclusive deals!
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 md:mt-0 px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg"
          >
            Shop Now
          </motion.button>
        </div>
      </motion.div>

      {/* Product List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-white">
          {activeTab === "trending"
            ? "Trending Now"
            : activeTab === "premium"
            ? "Premium Collection"
            : "All Products"}
        </h2>
        <ProductList
          products={filteredProducts}
          refreshProducts={refreshProducts}
        />
      </motion.div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 sm:p-12 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600 rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-600 rounded-full opacity-10"></div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            styling inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg"
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Products;
