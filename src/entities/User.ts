import { Schema, model } from "mongoose";
import { User } from "./types/User";

const schema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

export const UserModel = model<User>("user", schema);
