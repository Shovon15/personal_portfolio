import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
	code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
	password: z.string().min(6, {
		message: "Minimum 6 characters required",
	}),
	name: z.string().min(1, {
		message: "Name is required",
	}),
});

export const ProjectSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),

    category: z.string().min(1, {
        message: "category is required",
    }),

});

