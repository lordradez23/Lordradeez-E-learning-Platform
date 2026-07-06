import { z } from "zod";

export const contactUs = z.object({
  from_email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  subject: z
    .string({ message: "Subject is required" })
    .min(6, { message: "Subject must be at least 6 characters" })
    .max(32, { message: "Subject must be at most 32 characters" }),
  message: z
    .string({ message: "Description is required" })
    .min(8, { message: "Description must be at least 8 characters" })
    .max(200, { message: "Description must be at most 200 characters" }),
});

export type contactUsValues = z.infer<typeof contactUs>;
