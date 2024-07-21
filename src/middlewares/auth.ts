import { NextFunction, Request, Response } from "express";
import { JWTPayload } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    req.userId = payload.id;
    next();
  } catch (e) {
    res.status(400).send("Invalid Token");
  }
};
