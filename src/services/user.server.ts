import { UserModel } from "../models/user.model";
import { AppError } from "../utils/app.errors";

export const createUser = async (data: {
  name: string;
  email: string;
  isAdmin?: boolean;
}) => {
  return await UserModel.create(data);
};

export const findAllUsers = async () => {
  const users = await UserModel.find();

  if (!users || users.length === 0) {
    throw new AppError("No users found", 404);
  }

  return users;
};

export const findUserById = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const updateUser = async (
  id: string,
  data: Partial<{ name: string; email: string; isAdmin: boolean }>
) => {
  const user = await UserModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const deleteUser = async (id: string) => {
  const user = await UserModel.findByIdAndDelete(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};