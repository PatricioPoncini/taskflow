import { Request, Response } from "express";
import { userRepository } from "../config/repository";
import bcrypt from "bcrypt";
import { comparePasswords } from "../utils/password";

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, userName, password } = req.body as {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
  };

  const existingUser = await userRepository.findOne({ where: { userName } });
  if (existingUser)
    return res.status(400).json({ message: "Username is already in use" });

  const encryptPassword = await bcrypt.hash(password, 10);
  const newUser = userRepository.create({
    firstName,
    lastName,
    userName,
    password: encryptPassword,
  });

  await userRepository.save(newUser);
  return res.status(201).json({ message: "User created successfully" });
};

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

  return res.status(200).json({ message: "OK" });
};
