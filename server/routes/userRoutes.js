import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  dashboardAdmin,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/dashboard", authMiddleware, dashboardAdmin);

export default router;
