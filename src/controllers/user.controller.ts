import { Request, Response } from "express";
import {
  addUserToProjectService,
  createUserService,
  getUserByIdService,
  loginUserService,
  removeUserFromProjectService,
} from "../services/user.service";
import { CreateUserRequest } from "../entities/types/User";
import {
  createUserSchema,
  handleUserToProjectSchema,
  loginUserSchema,
} from "../middlewares/validators/user.validator";

export const createUser = async (req: Request, res: Response) => {
  const { username, firstname, lastname, password, email } =
    req.body as CreateUserRequest;
  await createUserSchema.validateAsync(req.body);

  await createUserService(username, firstname, lastname, password, email);

  return res.status(201).json({ message: "User created successfully!" });
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };

  const user = await getUserByIdService(userId);

  return res.status(200).json(user);
};

export const addUserToProject = async (req: Request, res: Response) => {
  const { userId, ownerProjectId, projectId } = req.body as {
    userId: string;
    ownerProjectId: string;
    projectId: string;
  };
  await handleUserToProjectSchema.validateAsync(req.body);

  const project = await addUserToProjectService(
    userId,
    ownerProjectId,
    projectId
  );

  return res.status(200).json(project);
};

export const removeUserFromProject = async (req: Request, res: Response) => {
  const { userId, ownerProjectId, projectId } = req.body as {
    userId: string;
    ownerProjectId: string;
    projectId: string;
  };
  await handleUserToProjectSchema.validateAsync(req.body);

  const project = await removeUserFromProjectService(
    userId,
    ownerProjectId,
    projectId
  );

  return res.status(200).json(project);
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };
  await loginUserSchema.validateAsync(req.body);

  const token = await loginUserService(username, password);

  return res.status(200).json({ token });
};
