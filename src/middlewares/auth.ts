import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { OPTIONAL_SECRET_TOKEN_KEY, SECRET_TOKEN_KEY } from "../env";

interface Payload {
  _id: string;
  username: string;
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenHeader = req.headers["authorization"];

  if (tokenHeader != undefined) {
    try {
      const payload = jwt.verify(
        tokenHeader,
        SECRET_TOKEN_KEY || OPTIONAL_SECRET_TOKEN_KEY
      ) as Payload;
      req.userId = payload._id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Access denied" });
  }
};
