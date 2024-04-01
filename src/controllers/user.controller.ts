import { Request, Response } from "express";
import {
  addUserToProjectService,
  createUserService,
  getUserByIdService,
  removeUserFromProjectService,
} from "../services/user.service";
import { CreateUserRequest } from "../entities/types/User";

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

export const addUserToProject = async (req: Request, res: Response) => {
  const { userId, ownerProjectId, projectId } = req.body as {
    userId: string;
    ownerProjectId: string;
    projectId: string;
  };

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

  const project = await removeUserFromProjectService(
    userId,
    ownerProjectId,
    projectId
  );

  return res.status(200).json(project);
};
