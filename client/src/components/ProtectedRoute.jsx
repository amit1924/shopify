// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import AuthContext from "../context/userContext";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   // If user is not authenticated, redirect to login page
//   if (!user) {
//     toast.error("Please login to access this page");
//     return <Navigate to="/login" replace />;
//   }

//   // If user is authenticated but not an admin
//   if (user.role !== "admin") {
//     toast.error("Sorry, only admin can access this page");
//     return <Navigate to="/login" replace />;
//   }

//   // If user is admin, allow access with animation
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default ProtectedRoute;

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/userContext";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);

  // If user is not authenticated, redirect to login page
  if (!user) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" replace />;
  }

  // If route is admin-only and user is not admin, redirect to home
  if (adminOnly && user.role !== "admin") {
    toast.error("Admin access required");
    return <Navigate to="/" replace />;
  }

  // If all checks pass, allow access with animation
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default ProtectedRoute;
