import type { Request, Response } from "express";
const users = [
  { id: 1, name: "Alice", job: "Donken" },
  { id: 2, name: "Bob", job: "Lager" },
];

export const getUsersById = (req: Request, res: Response) => {
  res.status(200).json(users);
};
