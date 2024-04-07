import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const OPTIONAL_SECRET_TOKEN_KEY = process.env.OPTIONAL_SECRET_TOKEN_KEY!;
export const SECRET_TOKEN_KEY = process.env.SECRET_TOKEN_KEY!;
