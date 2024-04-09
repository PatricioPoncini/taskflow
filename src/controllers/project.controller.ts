import { Request, Response } from "express";
import {
  createProjectService,
  getMyProjectsService,
} from "../services/project.service";
import { createProjectSchema } from "../middlewares/validators/project.validator";

export const createProject = async (req: Request, res: Response) => {
  const { title, description } = req.body as {
    title: string;
    description: string;
  };
  await createProjectSchema.validateAsync(req.body);
  const owner = req.userId;

  const project = await createProjectService(title, description, owner);

  return res.status(201).json(project);
};

export const getMyProjects = async (req: Request, res: Response) => {
  const userId = req.userId;

  const projects = await getMyProjectsService(userId);

  return res.status(200).json(projects);
};
