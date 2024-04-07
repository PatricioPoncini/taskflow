import { User } from "../entities/types/User";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN_KEY } from "../env";

export const generateJWT = (user: User) => {
  return jwt.sign(
    { _id: user._id, username: user.username },
    SECRET_TOKEN_KEY,
    { algorithm: "HS256", expiresIn: "1h" }
  );
};
