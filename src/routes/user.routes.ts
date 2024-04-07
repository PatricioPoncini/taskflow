import { Router } from "express";
import {
  createUser,
  getUserById,
  loginUser,
} from "../controllers/user.controller";
import { validateToken } from "../middlewares/auth";

const router = Router();

router.post("/create", createUser);

router.post("/login", loginUser);

router.get("/getById", validateToken, getUserById);

export default router;
