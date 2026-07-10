import express from "express";
import {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
} from "../controllers/storeController.js";

import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin 
router.post("/", verifyToken, isAdmin, createStore);
router.put("/:id", verifyToken, isAdmin, updateStore);
router.delete("/:id",verifyToken, isAdmin, deleteStore);

// Admin and shopper
router.get("/", verifyToken, getStores);
router.get("/:id", verifyToken, getStore);

export default router;