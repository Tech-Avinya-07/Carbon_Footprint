const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must be at most 30 characters long" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),

  email: z.string().trim().email({ message: "Invalid email address" }),

  phone: z
    .string()
    .trim()
    .min(10, { message: "phone number must be at least 10 digits" }),

  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),

  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

module.exports = { signupSchema, loginSchema };
