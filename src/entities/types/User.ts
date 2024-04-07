import { Schema } from "mongoose";

export interface User {
  _id: Schema.Types.ObjectId;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}

export interface CreateUserRequest {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}
