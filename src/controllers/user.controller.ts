import { Request, Response } from "express";
import { CreateUserRequest } from "../entities/types/User";
import {
  createUserService,
  getUserByIdService,
} from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  const { username, firstname, lastname, password, email } =
    req.body as CreateUserRequest;

  await createUserService(username, firstname, lastname, password, email);

  return res.status(201).json({ message: "User created successfully!" });
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };

  const user = await getUserByIdService(userId);

  return res.status(200).json(user);
};
