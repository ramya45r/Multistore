import express from "express";
import { registerUser,loginUser,logoutUser,getMe } from "../controllers/authControlller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register user
router.post("/register", registerUser);
// Login user
router.post("/login", loginUser);
// Logout user
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);
export default router;