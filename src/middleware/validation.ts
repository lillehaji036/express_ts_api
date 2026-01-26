import { Request, Response, NextFunction } from "express";
import { error } from "node:console";
import {z} from "zod";
import { Schema } from "zod/v3";

export const validate =
(Schema: z.ZodTypeAny) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Schema.parseAsync(req.body);
    next();
  } catch (err) {
   return res.status(400).json({ message: "Invalid request data", errors: error });
  }
};
