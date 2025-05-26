// import React, { useState } from "react";
// import { useContext } from "react";
// import AuthContext from "../context/userContext";

// const Register = () => {
//   const [fullName, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { register } = useContext(AuthContext);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await register(fullName, email, password);
//       console.log("Registration successful:", response);
//     } catch (error) {
//       console.error("Registration error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="fullname">Full Name</label>
//           <input
//             type="text"
//             id="fullname"
//             name="fullname"
//             required
//             value={fullName}
//             onChange={(e) => setFullname(e.target.value)}
//           />
//         </div>
//         <br />
//         <br />
//         <br />
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <br />
//         <br />
//         <br />
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <br />
//         <br />
//         <br />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/userContext";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaUserPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await register(fullName, email, password);
      toast.success("Registration successful! You can now login.");
      navigate("/login");
      console.log("Registration successful:", response);
      // Clear form
      setFullname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-purple-500/20 relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -top-1 -left-1 w-32 h-32 bg-purple-500 rounded-full filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-1 -right-1 w-32 h-32 bg-cyan-500 rounded-full filter blur-xl opacity-20 animate-pulse"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <motion.h2
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500 mb-2"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4 }}
              >
                Create Account
              </motion.h2>
              <p className="text-gray-400">Join us today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    required
                    value={fullName}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="your@email.com"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-700 text-white font-medium shadow-lg transform hover:scale-[1.02] transition-all duration-200 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
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
                  ) : (
                    <FaUserPlus className="mr-2" />
                  )}
                  Register
                </button>
              </motion.div>
            </form>

            <motion.div
              className="mt-6 text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Login here
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
