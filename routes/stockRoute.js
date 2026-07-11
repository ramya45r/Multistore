import express from "express";

import {
  createStock,
  getStocks,
  adjustStock,
  transferStock,getStoreProducts
} from "../controllers/stockController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
//Admin
router.post("/",verifyToken, isAdmin, createStock);
router.patch("/adjust",verifyToken, isAdmin, adjustStock);
router.post("/transfer",verifyToken, isAdmin, transferStock);
router.get("/storeproducts/:id",verifyToken, getStoreProducts );

//shopper and admin
router.get("/", getStocks);


export default router;
