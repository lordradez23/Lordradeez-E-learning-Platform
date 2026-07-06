import { z } from "zod";

const fullnameField = z
  .string({ message: "Full name is required" })
  .min(8, { message: "Full name must be at least 8 characters" })
  .max(20, { message: "Full name must be at most 20 characters" });

const usernameField = z
  .string({ message: "User name is required" })
  .min(5, { message: "User name must be at least 5 characters" })
  .max(20, { message: "User name must be at most 20 characters" });

const emailField = z
  .string({ message: "Email is required" })
  .email({ message: "Invalid email address" })
  .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

const passwordField = z
  .string({ message: "Password is required" })
  .min(6, { message: "Password must be at least 6 characters" })
  .max(32, { message: "Password must be at most 32 characters" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/g, {
    message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
  });

const confirmPasswordField = z.string({ message: "Confirm password is required" });

export const registerSchema = z
  .object({
    fullname: fullnameField,
    username: usernameField,
    email: emailField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type registerSchemaValues = z.infer<typeof registerSchema>;

export const serverRegisterSchema = z.object({
  fullname: fullnameField,
  username: usernameField,
  email: emailField,
  password: passwordField,
});
