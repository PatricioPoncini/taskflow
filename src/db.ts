import mongoose from "mongoose";
import { MONGO_URI } from "./env";

export async function connectToDB(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Error connecting DB: ", error);
    throw error;
  }
}
