import { Router } from "express";
import {
  createProject,
  getMyProjects,
} from "../controllers/project.controller";
import { validateToken } from "../middlewares/auth";

const router = Router();

router.post("/create", validateToken, createProject);

router.get("/myProjects", validateToken, getMyProjects);

export default router;
