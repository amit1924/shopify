import React, { useState, useEffect } from "react";
import { useCartStore } from "../store/useStore";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiCreditCard,
  FiUser,
  FiMail,
  FiMapPin,
  FiShoppingBag,
  FiArrowLeft,
  FiTrash2,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

// Card brand logos (you can import actual SVGs or use icons)
const CardIcons = {
  visa: "VISA",
  mastercard: "MC",
  amex: "AMEX",
  discover: "DISCOVER",
  diners: "DINERS",
  jcb: "JCB",
  unionpay: "UNIONPAY",
  unknown: "••••",
};

const Checkout = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const deleteFromCart = useCartStore((state) => state.deleteFromCart);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [cardType, setCardType] = useState("unknown");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Detect card type based on number
  const detectCardType = (number) => {
    const cleaned = number.replace(/\D/g, "");

    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    if (/^6(?:011|5)/.test(cleaned)) return "discover";
    if (/^3(?:0[0-5]|[68])/.test(cleaned)) return "diners";
    if (/^(?:2131|1800|35)/.test(cleaned)) return "jcb";
    if (/^62/.test(cleaned)) return "unionpay";

    return "unknown";
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const maxLength = cardType === "amex" ? 15 : 16;
    const limited = cleaned.slice(0, maxLength);

    if (cardType === "amex") {
      return limited.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
    }
    return limited.replace(/(\d{4})/g, "$1 ").trim();
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const month = cleaned.slice(0, 2);
    const year = cleaned.slice(2, 4);

    if (cleaned.length > 2) {
      return `${month}/${year}`;
    }
    return month;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      const detectedType = detectCardType(value);
      setCardType(detectedType);
      formattedValue = formatCardNumber(value);
    } else if (name === "expiry") {
      formattedValue = formatExpiry(value);
    } else if (name === "cvv") {
      const maxLength = cardType === "amex" ? 4 : 3;
      formattedValue = value.replace(/\D/g, "").slice(0, maxLength);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardNumberRegex =
      cardType === "amex" ? /^\d{4} \d{6} \d{5}$/ : /^\d{4} \d{4} \d{4} \d{4}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const cvvRegex = cardType === "amex" ? /^\d{4}$/ : /^\d{3}$/;

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.address) newErrors.address = "Address is required";

    // Card validation
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!cardNumberRegex.test(formData.cardNumber)) {
      newErrors.cardNumber = "Invalid card number";
    }

    if (!formData.expiry) {
      newErrors.expiry = "Expiry date is required";
    } else if (!expiryRegex.test(formData.expiry)) {
      newErrors.expiry = "Invalid expiry date (MM/YY)";
    } else {
      // Check if card is expired
      const [month, year] = formData.expiry.split("/");
      const expiryDate = new Date(`20${year}`, month);
      const currentDate = new Date();

      if (expiryDate < currentDate) {
        newErrors.expiry = "Card has expired";
      }
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv =
        cardType === "amex" ? "Invalid 4-digit CVV" : "Invalid 3-digit CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save order details before clearing cart
      setOrderDetails({
        total,
        itemCount: cart.length,
        items: [...cart],
      });

      setIsSubmitted(true);
      clearCart();

      toast.success("Payment successful! Order placed.", {
        position: "bottom-right",
        style: {
          background: "#1F2937",
          color: "#E5E7EB",
          border: "1px solid #6B7280",
          boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
        },
      });
    } catch (error) {
      toast.error("Payment failed. Please try again.", {
        position: "bottom-right",
        style: {
          background: "#1F2937",
          color: "#E5E7EB",
          border: "1px solid #6B7280",
          boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && !isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-gray-400"
      >
        <FiShoppingBag size={48} className="mb-4" />
        <p className="text-xl mb-4">Your cart is empty</p>
        <Link
          to="/"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </motion.div>
    );
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <FiCheckCircle className="text-green-500 text-6xl mb-6" />
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-md">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>
        <div className="bg-gray-800 rounded-xl p-6 mb-8 w-full max-w-md">
          <h2 className="text-xl font-semibold text-white mb-4">
            Order Summary
          </h2>
          <p className="text-gray-400 mb-2">
            Total:{" "}
            <span className="text-purple-400 font-bold">
              ${orderDetails?.total.toFixed(2)}
            </span>
          </p>
          <p className="text-gray-400">
            Items: <span className="text-white">{orderDetails?.itemCount}</span>
          </p>
        </div>
        <Link
          to="/"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-4 px-4 sm:px-6"
    >
      <div className="flex items-center mb-6">
        <Link
          to="/cart"
          className="mr-4 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <FiArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Information and Payment */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <FiUser className="mr-2 text-purple-400" /> Customer Information
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-purple-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-purple-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="address">
                Shipping Address
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-purple-400" />
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                    errors.address ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                />
              </div>
              {errors.address && (
                <p className="text-red-400 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <FiCreditCard className="mr-2 text-purple-400" /> Payment Details
            </h2>

            {/* Card Preview */}
            <div className="mb-4 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-4 border border-purple-500/30">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-purple-200">Card Number</div>
                <div className="bg-gray-900/50 px-2 py-1 rounded text-xs font-bold text-white">
                  {CardIcons[cardType]}
                </div>
              </div>
              <div className="text-xl font-mono tracking-wider mb-6">
                {formData.cardNumber || "•••• •••• •••• ••••"}
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-purple-200 mb-1">
                    Card Holder
                  </div>
                  <div className="text-sm">{formData.name || "YOUR NAME"}</div>
                </div>
                <div>
                  <div className="text-xs text-purple-200 mb-1">Expires</div>
                  <div className="text-sm">{formData.expiry || "••/••"}</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="cardNumber">
                Card Number
              </label>
              <div className="relative">
                <FiCreditCard className="absolute left-3 top-3 text-purple-400" />
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                    errors.cardNumber ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                />
              </div>
              {errors.cardNumber && (
                <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-400 mb-2" htmlFor="expiry">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className={`w-full px-4 py-2 bg-gray-700 border ${
                    errors.expiry ? "border-red-500" : "border-gray-600"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                />
                {errors.expiry && (
                  <p className="text-red-400 text-sm mt-1">{errors.expiry}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 mb-2" htmlFor="cvv">
                  CVV
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder={cardType === "amex" ? "4 digits" : "3 digits"}
                    className={`w-full px-4 py-2 bg-gray-700 border ${
                      errors.cvv ? "border-red-500" : "border-gray-600"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
                  />
                </div>
                {errors.cvv && (
                  <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isProcessing}
              className={`w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold ${
                isProcessing
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:opacity-90"
              } transition-opacity flex items-center justify-center`}
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Pay $${total.toFixed(2)}`
              )}
            </motion.button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

          <div className="mb-6 max-h-[400px] overflow-y-auto">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between py-4 border-b border-gray-700"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 mr-4 overflow-hidden rounded-lg flex-shrink-0">
                    {item.images?.[0] && (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-purple-400 text-xs sm:text-sm">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 sm:p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="text-white font-bold mx-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      className="p-1 sm:p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveItem(item.id, item.title)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Tax (10%)</span>
              <span className="text-white">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-xl font-bold text-purple-400">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
