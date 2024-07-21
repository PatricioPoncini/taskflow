import dotenv from "dotenv";
dotenv.config();

export const PORT = parseInt(process.env.PORT ?? "3000", 10);
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = parseInt(process.env.DB_PORT ?? "3306");
export const JWT_SECRET = process.env.JWT_SECRET ?? "";
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET ?? "";
