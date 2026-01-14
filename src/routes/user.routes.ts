import { Router } from "express";
import { getUsersById } from "../controllers/user.controller.js";

const router = Router();
router.get("/", getUsersById);
router.get("/:id", getUsersById);

export default router;
