import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js'
dotenv.config();

connectDb();
const app = express();
app.use(express.json());
 const PORT = process.env.PORT;
 app.use("/api/auth",authRoutes );

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});