import mongoose from "mongoose";
import createAdmin from "../seed/adminSeeder.js";

const connectDb = async () => {
  try {
    const connectdatabase = await mongoose.connect(process.env.MONGO_URL);
    await createAdmin();
    console.log("Database connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
export default connectDb;
