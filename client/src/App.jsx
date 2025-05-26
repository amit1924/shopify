import React, { useState, useContext } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import DashboardAdmin from "./components/DashboardAdmin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import NotFound from "./components/NotFound";
import AuthContext from "./context/userContext";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const App = () => {
  const { logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Neon Green Glow effects for the whole app */}
        <div className="fixed top-0 left-1/4 w-64 h-64 bg-emerald-500 rounded-full filter blur-3xl opacity-10 -z-10 animate-pulse"></div>
        <div className="fixed bottom-0 right-1/4 w-64 h-64 bg-green-500 rounded-full filter blur-3xl opacity-10 -z-10 animate-pulse"></div>

        <Navbar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          handleLogout={handleLogout}
        />

        {/* Main content with page transitions */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/register"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Register />
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Login />
                </motion.div>
              }
            />
            <Route
              path="/dashboard"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProtectedRoute adminOnly>
                    <DashboardAdmin />
                  </ProtectedRoute>
                </motion.div>
              }
            />

            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Products />
                </motion.div>
              }
            />
            <Route
              path="/products/:id"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductDetail />
                </motion.div>
              }
            />
            <Route
              path="/cart"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                </motion.div>
              }
            />
            <Route
              path="/checkout"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                </motion.div>
              }
            />
            <Route
              path="*"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <NotFound />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>

        {/* Toaster with neon green theme */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111827",
              color: "#fff",
              border: "1px solid #065f46",
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#111827",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#111827",
              },
            },
          }}
        />
      </div>
    </Router>
  );
};

export default App;
