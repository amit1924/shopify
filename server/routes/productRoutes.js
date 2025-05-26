import express from "express";
import upload from "../lib/multer.js";

const router = express.Router();
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.post("/products", upload.array("images", 5), createProduct);
router.put("/products/:id", upload.array("images", 5), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
