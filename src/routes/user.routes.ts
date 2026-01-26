import express from "express";
import {
  createUserHandler,
  getUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/user.controller";

import { validate } from "../middleware/validation";
import { createUserZodSchema } from "../models/user.model";

const router = express.Router();

router.post("/", validate(createUserZodSchema), createUserHandler);
router.get("/", getUsersHandler);
router.get("/:id", getUserByIdHandler);
router.patch("/:id", updateUserHandler);
router.delete("/:id", deleteUserHandler);

export default router;