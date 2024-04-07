import { Router } from "express";
import {
  createProject,
  getMyProjects,
} from "../controllers/project.controller";
import {
  addUserToProject,
  removeUserFromProject,
} from "../controllers/user.controller";
import { validateToken } from "../middlewares/auth";

const router = Router();

router.post("/create", validateToken, createProject);

router.get("/myProjects", validateToken, getMyProjects);

router.put("/addUser", validateToken, addUserToProject);

router.put("/removeUser", validateToken, removeUserFromProject);

export default router;
