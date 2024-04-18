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

/**
 * @openapi
 * /user/getById:
 *   get:
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
 *
 * /user/create:
 *   post:
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       400:
 *         description: User already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully!
 */
