import { Router } from "express";
import { loginUser, refreshToken } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/login", loginUser);
router.post("/refresh-token", authMiddleware, refreshToken);

export default router;
