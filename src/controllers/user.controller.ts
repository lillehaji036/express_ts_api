import { NextFunction, Request, Response } from "express";
import {
  createUserZodSchema,
  CreateUserInput,
  UpdateUserInput,
} from "../models/user.model";

import {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
} from "../services/user.server";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
    next(error);
  }
};

export const getUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error: any) {
    next(error);
  }
};

export const getUserByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error: any) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    next(error);
  }
};

export const updateUserHandler = async (
  req: Request<{ id: string }, {}, UpdateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await updateUser(req.params.id, req.body);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error: any) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
    next(error);
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    next(error);
  }
};