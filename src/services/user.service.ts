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
