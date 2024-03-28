import { UserModel } from "../entities/User";
import bcrypt from "bcrypt";
import { CustomError } from "../middlewares/common/httpException";

export const createUserService = async (
  username: string,
  firstname: string,
  lastname: string,
  password: string,
  email: string
) => {
  const existUser = await UserModel.findOne({ username });

  if (existUser) {
    throw new CustomError(400, "User already exist");
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
