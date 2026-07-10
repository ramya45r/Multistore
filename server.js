import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoute.js';
import storeRoutes from './routes/storeRoute.js';
import stokeRoutes from './routes/stokeRoute.js';

dotenv.config();

connectDb();
const app = express();
app.use(express.json());
 const PORT = process.env.PORT;
 app.use("/api/auth",authRoutes );
 app.use("/api/product",productRoutes );
 app.use("/api/store",storeRoutes );
 app.use("/api/stoke",stokeRoutes );

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});