import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { OPTIONAL_SECRET_TOKEN_KEY, SECRET_TOKEN_KEY } from "../env";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenHeader = req.headers["authorization"];

  if (tokenHeader != undefined) {
    try {
      jwt.verify(tokenHeader, SECRET_TOKEN_KEY || OPTIONAL_SECRET_TOKEN_KEY);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Access denied" });
  }
};
