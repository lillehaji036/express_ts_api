import mongoose from "mongoose";
import { z } from "zod";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model("User", userSchema);

export const createUserZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    isAdmin: z.boolean().optional(),
  }),
});

export const registerUserValidationSchema = createUserZodSchema.extend({
  body: createUserZodSchema.shape.body.extend({
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

export const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    isAdmin: z.boolean().optional(),
  }),
});

export type CreateUserInput = z.infer<typeof createUserZodSchema>["body"];
export type UpdateUserInput = z.infer<typeof updateUserZodSchema>["body"];