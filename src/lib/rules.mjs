import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z
      .string({ message: "The email should be a string" })
      .email("Enter a valid email")
      .trim(),
    password: z
      .string()
      .min(1, { message: "Not be empty" })
      .min(5, { message: "Be at lease 5 characters" })
      .regex(/[a-zA-Z]/, { message: "contains at least one letter" })
      .regex(/[0-9]/, { message: "contains at least one number" })
      .regex(/^[a-zA-z0-9]/, {
        message: "contain at least one special character",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "passwords fields do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const BlogPostSchema = z.object({
  title: z
    .string()
    .min(1, { message: "title field is required" })
    .max(100, { message: "title field cannot be longer than 100 characters" })
    .trim(),
  content: z
    .string()
    .min(1, { message: "content field cannot be empty" })
    .trim(),
});
