import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//Admin
router.post("/create",verifyToken, isAdmin, createProduct);
router.put("/update/:id", verifyToken, isAdmin,updateProduct);
router.delete("/delete/:id",verifyToken, isAdmin, deleteProduct);
// Admin and shopper
router.get("/",verifyToken, getProducts);
router.get("/:id",verifyToken, getProductById);

export default router;
