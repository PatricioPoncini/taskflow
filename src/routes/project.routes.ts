import { Router } from "express";
import {
  createProject,
  getMyProjects,
} from "../controllers/project.controller";
import {
  addUserToProject,
  removeUserFromProject,
} from "../controllers/user.controller";

const router = Router();

router.post("/create", createProject);

router.get("/myProjects", getMyProjects);

router.put("/addUser", addUserToProject);

router.put("/removeUser", removeUserFromProject);

export default router;
