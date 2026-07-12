import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoute.js';
import storeRoutes from './routes/storeRoute.js';
import stokeRoutes from './routes/stockRoute.js';
import cookieParser from "cookie-parser";
import { swaggerSetup } from "./config/swagger.js";

dotenv.config();

connectDb();
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
swaggerSetup(app);
 const PORT = process.env.PORT;
 app.use("/api/auth",authRoutes );
 app.use("/api/product",productRoutes );
 app.use("/api/store",storeRoutes );
 app.use("/api/stock",stokeRoutes );

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});