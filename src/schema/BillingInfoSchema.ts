import { z } from "zod";

export const billingInfo = z.object({
  firstName: z.string({ message: "First name is required" }),
  lastName: z.string({ message: "Last name is required" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  address: z.string({ message: "address is required" }),
  country: z.string({ message: "country is required" }),
  city: z.string({ message: "city is required" }),
  state: z.string({ message: "state is required" }),
  zipCode: z.string({ message: "zip code is required" }),
});

export type billingInfoValues = z.infer<typeof billingInfo>;
