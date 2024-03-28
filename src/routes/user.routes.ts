import { Router } from "express";
import { createUser, getUserById } from "../controllers/user.controller";

const router = Router();

router.post("/create", createUser);

router.get("/getById", getUserById);

export default router;
