import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart, FiArrowLeft, FiPlus, FiMinus } from "react-icons/fi";
import { useCartStore } from "../store/useStore";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import API_URL from "../config/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  // In ProductDetail.jsx
  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Add this check first
        if (!id) {
          throw new Error("Product ID is missing");
        }

        const response = await fetch(`${API_URL}/api/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have an ID
    if (id) {
      fetchProduct();
    } else {
      setError("Product ID is missing");
      setLoading(false);
    }
  }, [id]);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`${quantity} ${product.title} added to cart!`, {
      position: "bottom-right",
      style: {
        background: "#1F2937",
        color: "#E5E7EB",
        border: "1px solid #6B7280",
        boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-400 w-full px-4">
        <p className="text-xl mb-4 text-center">{error}</p>
        <Link
          to="/"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 w-full px-4">
        <p className="text-xl mb-4 text-center">Product not found</p>
        <Link
          to="/"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-x-hidden px-4 sm:px-6 py-4 sm:py-8"
    >
      <div className="flex items-center mb-4 sm:mb-6 w-full">
        <Link
          to="/"
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors mr-4 text-sm sm:text-base"
        >
          <FiArrowLeft className="mr-1 sm:mr-2" /> Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full">
        {/* Product Images */}
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 w-full">
          <div className="h-64 sm:h-80 md:h-96 overflow-hidden">
            {product.images?.[0] && (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 p-2">
            {product.images?.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className="h-16 sm:h-20 md:h-24 overflow-hidden rounded-md border border-gray-700 hover:border-purple-500 transition-colors"
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-4 sm:p-6 w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            {product.title}
          </h1>
          <div className="flex items-center mb-3 sm:mb-4">
            <span className="text-purple-400 font-bold text-lg sm:text-xl md:text-2xl">
              ${product.price}
            </span>
            {product.price > 100 && (
              <span className="ml-2 sm:ml-4 px-2 py-1 bg-green-600 text-xs text-white rounded-full">
                Free Shipping
              </span>
            )}
          </div>

          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
              Description
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
              Category
            </h2>
            <span className="inline-block px-2 sm:px-3 py-1 bg-gray-700 text-purple-400 rounded-full text-xs sm:text-sm">
              {product.category || "Uncategorized"}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Quantity
              </h2>
              <div className="flex items-center border border-gray-600 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 text-gray-300 hover:bg-gray-700 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="px-4 py-1 text-white border-x border-gray-600">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 text-gray-300 hover:bg-gray-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base font-semibold"
          >
            <FiShoppingCart /> Add to Cart
          </motion.button>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
              Details
            </h2>
            <ul className="text-gray-300 space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>Product ID: {product.id}</li>
              <li>
                Created: {new Date(product.creationAt).toLocaleDateString()}
              </li>
              <li>
                Updated: {new Date(product.updatedAt).toLocaleDateString()}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
