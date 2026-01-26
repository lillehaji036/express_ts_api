import bcrypt from "bcryptjs";
import { z } from "zod";
import { createUserZodSchema, UserModel } from "../models/user.model"

type RegisterUserType = z.infer<typeof createUserZodSchema>["body"];

export const registerService = async (userData: RegisterUserType) => {
  const { age, email, name, password } = userData;

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    name,
    email,
    age,
    password: hashedPassword,
  };

  const createUser = await UserModel.create(newUser);

  return createUser;
};

export const loginUserService = async (userCredentials: {
  email: string;
  password: string;
}) => {
  const { email, password } = userCredentials;
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return user;
};
