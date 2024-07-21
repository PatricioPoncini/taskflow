import jwt from "jsonwebtoken";
import { JWT_SECRET, REFRESH_JWT_SECRET } from "../env";

export interface JWTPayload {
  id: number;
}

export const generateJWT = (userId: number) => {
  return jwt.sign({ id: String(userId) }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

export const generateRefreshJWT = (userId: number) => {
  return jwt.sign({ id: String(userId) }, REFRESH_JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "120s",
  });
};
