import { NextFunction, Request, response, Response } from "express";
import { request } from "node:http";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);
  res.status(500).json({ message: "internal server error" });
};
