import { Schema } from "mongoose";

export interface Project {
  title: string;
  description: string;
  owner: Schema.Types.ObjectId;
  users: Schema.Types.ObjectId[];
}
