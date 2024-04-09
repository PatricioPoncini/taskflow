import { Router } from "express";
import {
  addUserToProject,
  createUser,
  getUserById,
  loginUser,
  removeUserFromProject,
} from "../controllers/user.controller";
import { validateToken } from "../middlewares/auth";

const router = Router();

router.post("/create", createUser);

router.post("/login", loginUser);

router.get("/getById", validateToken, getUserById);

router.put("/addUser", validateToken, addUserToProject);

router.put("/removeUser", validateToken, removeUserFromProject);

export default router;
