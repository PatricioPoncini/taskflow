import { Router } from "express";
import {
  createProject,
  getMyProjects,
} from "../controllers/project.controller";

const router = Router();

router.post("/create", createProject);

router.get("/myProjects", getMyProjects);

export default router;
