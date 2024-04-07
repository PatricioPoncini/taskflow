import { Request, Response } from "express";
import {
  createProjectService,
  getMyProjectsService,
} from "../services/project.service";

export const createProject = async (req: Request, res: Response) => {
  const { title, description } = req.body as {
    title: string;
    description: string;
  };
  const owner = req.userId;

  const project = await createProjectService(title, description, owner);

  return res.status(201).json(project);
};

export const getMyProjects = async (req: Request, res: Response) => {
  const userId = req.userId;

  const projects = await getMyProjectsService(userId);

  return res.status(200).json(projects);
};
