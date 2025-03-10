import mongoose from "mongoose";
import logger from "../logger/winston.logger.js";
import {DB_NAME } from "../contants.js";

// Connect to MongoDB

export const connectDB = async () => {
  try {
      const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

      logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
      logger.error(`Error: ${error.message}`);
      
  }
};