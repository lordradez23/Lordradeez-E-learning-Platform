import { z } from "zod";

export const ProfileSettingsSchema = z.object({
  username: z
    .string()
    .min(5, { message: "User name must be at least 5 characters" })
    .max(20, { message: "User name must be at most 20 characters" })
    .optional(),
  fullname: z
    .string()
    .min(8, { message: "Full name must be at least 8 characters" })
    .max(20, { message: "Full name must be at most 20 characters" })
    .optional(),
  language: z.string().optional(),
  role: z.enum(["USER", "INSTRUCTOR"]).optional(),
});

export type ProfileSettingsSchemaSchemaValues = z.infer<typeof ProfileSettingsSchema>;

const emailField = z
  .string({ message: "Invalid email" })
  .email({ message: "Invalid email" })
  .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).optional();

const passwordField = z
  .string({ message: "Password is required" })
  .min(6, { message: "Password must be at least 6 characters" })
  .max(32, { message: "Password must be at most 32 characters" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/g, {
    message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
  }).optional();

const confirmPasswordField = z.string({ message: "Confirm password is required" });

export const ChangeAccountSchema = z
  .object({
    email: emailField,
    currentPassword: passwordField,
    newPassword: passwordField,
    confirmNewPassword: confirmPasswordField,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"],
  });

export type ChangeAccountSchemaValues = z.infer<typeof ChangeAccountSchema>;

export const SocialSettingsSchema = z.object({
  linkedin: z.string().url({ message: "Invalid URL" }).optional(),
  github: z.string().url({ message: "Invalid URL" }).optional(),
  facebook: z.string().url({ message: "Invalid URL" }).optional(),
  website: z.string().url({ message: "Invalid URL" }).optional(),
});

export type SocialSettingsSchemaValues = z.infer<typeof SocialSettingsSchema>;
