import React, { useEffect, useState } from "react";
import API_URL from "../config/api";
import ProductList from "./ProductList";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLoader,
  FiAlertCircle,
  FiChevronDown,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaFire, FaRocket, FaRegGem } from "react-icons/fa";

// Sample product images for the slideshow
const slideshowProducts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "Premium Headphones",
    description: "Experience crystal clear sound with noise cancellation",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "Smart Watches",
    description: "Stay connected with our latest wearable technology",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "Wireless Earbuds",
    description: "True wireless freedom with premium audio quality",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "Running Shoes",
    description: "Engineered for performance and comfort",
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slideshowProducts.length) % slideshowProducts.length
    );
  };

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
  }, [refreshTrigger]);

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
      {/* Product Slideshow Section */}
      <div className="relative overflow-hidden rounded-2xl mb-12 h-96 sm:h-[32rem] shadow-xl">
        {/* Slideshow images */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slideshowProducts.map((product, index) => (
            <div
              key={product.id}
              className="w-full h-full flex-shrink-0 relative"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              <div className="absolute left-10 bottom-1/4 text-left max-w-md z-10">
                <motion.h2
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-5xl font-bold text-white mb-2"
                >
                  {product.title}
                </motion.h2>
                <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl text-purple-100 mb-4"
                >
                  {product.description}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg"
                >
                  Shop Now
                </motion.button>
              </div>
            </div>
          ))}
        </div>

        {/* Slideshow controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
        >
          <FiChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
        >
          <FiChevronRight size={28} />
        </button>

        {/* Slideshow indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slideshowProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
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
