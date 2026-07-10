import express from "express";

import {
  createStock,
  getStocks,
  adjustStock,
  transferStock,
} from "../controllers/stockController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
//Admin
router.post("/",verifyToken, isAdmin, createStock);
router.patch("/adjust",verifyToken, isAdmin, adjustStock);
router.post("/transfer",verifyToken, isAdmin, transferStock);
//shopper and admin
router.get("/", getStocks);


export default router;
