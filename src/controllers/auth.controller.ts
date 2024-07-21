import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { REFRESH_JWT_SECRET } from "../env";
import { generateJWT, generateRefreshJWT, JWTPayload } from "../utils/jwt";
import { userRepository } from "../config/repository";
import { comparePasswords } from "../utils/password";

export const loginUser = async (req: Request, res: Response) => {
  const { userName, password } = req.body as {
    userName: string;
    password: string;
  };

  const existingUser = await userRepository.findOne({ where: { userName } });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswValid = await comparePasswords(password, existingUser.password);
  if (!isPasswValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateJWT(existingUser.id);
  const refreshToken = generateRefreshJWT(existingUser.id);
  existingUser.refreshToken = refreshToken;
  await userRepository.save(existingUser);

  return res.status(200).json({ token, refreshToken });
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.headers.refresh as string;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ message: "Refresh header not found in request" });
  }

  try {
    const { id } = jwt.verify(refreshToken, REFRESH_JWT_SECRET) as JWTPayload;
    const newToken = generateJWT(id);
    return res.status(200).json({ token: newToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
