import mongoose from "mongoose";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB Database ${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`MongoDB Error ${error}`.bgRed.white);
  }
};

export default connectDB;
