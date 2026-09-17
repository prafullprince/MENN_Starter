import { email, z } from "zod";

// Email Schema
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid Email Address");

// Password Schema
export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must contain 8 characters")
  // .regex(/[a-z]/, "Password must contain lowercase char")
  // .regex(/[A-Z]/, "Password must contain uppercase char")
  // .regex(/[0-9]/, "Password must contain a Number");

// OTP Schema
export const otpSchema = z
  .string()
  .trim()
  .length(6, "Otp must be of 6 chars")
  .regex(/^\d+$/, "OTP must be numeric");

// Register Schema
export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(3, "Name must be of at least 3 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    otp: otpSchema
  }),
});

// Login Schema
export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
});

// Verify Email Schema
export const verifyEmailSchema = z.object({
  body: z.object({
    email: emailSchema,
  }),
});

export type RegisterDto = z.infer<typeof registerSchema>["body"];
export type LoginDto = z.infer<typeof loginSchema>["body"];
export type VerifyEmailDto = z.infer<typeof verifyEmailSchema>["body"];
