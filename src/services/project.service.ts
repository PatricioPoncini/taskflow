import { ProjectModel } from "../entities/Project";
import { CustomError } from "../middlewares/common/httpException";

export const createProjectService = async (
  title: string,
  description: string,
  owner: string
) => {
  const existProject = await ProjectModel.findOne({ owner, title });

  if (existProject) {
    throw new CustomError(401, "Project already exist");
  }

  return await ProjectModel.create({ title, description, owner });
};

export const getMyProjectsService = async (userId: string) => {
  const projects = await ProjectModel.find({ owner: userId });

  if (projects.length === 0) {
    throw new CustomError(404, "0 projects found");
  }

  return projects;
};
