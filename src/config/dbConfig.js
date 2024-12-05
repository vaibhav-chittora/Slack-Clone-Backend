import mongoose from 'mongoose';

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from './serverConfig.js';
export async function connectDB() {
  try {
    if (NODE_ENV === 'development') {
      await mongoose.connect(DEV_DB_URL);
    } else if (NODE_ENV === 'production') {
      await mongoose.connect(PROD_DB_URL);
    }
    console.log(`Connected to MongoDB Database from ${NODE_ENV} environment.`);
  } catch (error) {
    console.log(`Error connecting in Database -`, error);
  }
}
