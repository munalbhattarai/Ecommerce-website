import { z } from "zod";

export const loginSchema = z.object({
    username: z
        .string()
        .min(1, "Username is required"),

    password: z
        .string()
        .min(1, "Password is required"),
});


export const registerSchema = z.object({

    username: z
        .string()
        .min(3, "Username must be at least 3 characters"),

    email: z
        .string()
        .email("Enter a valid email"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),

    password2: z
        .string()
        .min(8, "Please confirm your password"),

}).refine(
    (data) => data.password === data.password2,
    {
        message: "Passwords do not match",
        path: ["password2"],
    }
);