import { Schema, Types, model } from "mongoose";
import { Project } from "./types/Project";

const schema = new Schema<Project>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: Types.ObjectId, required: true },
  users: [{ type: Types.ObjectId, required: false, default: [] }],
});

export const ProjectModel = model<Project>("project", schema);
