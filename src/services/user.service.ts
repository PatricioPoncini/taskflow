import { UserModel } from "../entities/User";
import bcrypt from "bcrypt";
import { CustomError } from "../middlewares/common/customError";
import { ProjectModel } from "../entities/Project";
import { validatePassword } from "../utils/validatePassword";
import { generateJWT } from "../utils/jwt";

export const createUserService = async (
  username: string,
  firstname: string,
  lastname: string,
  password: string,
  email: string
) => {
  const existUser = await UserModel.findOne({ username });

  if (existUser) {
    throw new CustomError(400, "User already exists");
  }

  const hash = await bcrypt.hash(password, 10);
  return await UserModel.create({
    username,
    firstname,
    lastname,
    password: hash,
    email,
  });
};

export const getUserByIdService = async (userId: string) => {
  const user = await UserModel.findById(userId).select("-password");

  if (!user) {
    throw new CustomError(404, "User not found");
  }

  return user;
};

export const addUserToProjectService = async (
  userId: string,
  ownerProjectId: string,
  projectId: string
) => {
  const project = await ProjectModel.findOneAndUpdate(
    {
      owner: ownerProjectId,
      _id: projectId,
    },
    { $addToSet: { users: userId } },
    { new: true }
  );

  if (!project) {
    throw new CustomError(404, "Project not found");
  }

  return project;
};

export const removeUserFromProjectService = async (
  userId: string,
  ownerProjectId: string,
  projectId: string
) => {
  const project = await ProjectModel.findOneAndUpdate(
    {
      owner: ownerProjectId,
      _id: projectId,
    },
    { $pull: { users: userId } },
    { new: true }
  );

  if (!project) {
    throw new CustomError(404, "Project not found");
  }

  return project;
};

export const loginUserService = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new CustomError(404, "User not found");
  }

  const isPasswordValid = await validatePassword(password, user.password);

  if (!isPasswordValid) {
    throw new CustomError(401, "Password does not match");
  }

  const token = generateJWT(user);

  return token;
};
