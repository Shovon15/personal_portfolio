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

export const StudentSchema = z.object({
    nameEng: z.string().min(1, {
        message: "Name is required",
    }),

    nameBan: z.string().min(1, {
        message: "Name is required",
    }),

    bloodGroup: z.optional(z.string()),

    religion: z.string().min(1, {
        message: "Select a option",
    }),
    
    applicationNo: z.optional(z.string()),
});

export const SearchSchema = z.object({
    class: z.string().min(1, {
        message: "select a class",
    }),
    group: z.optional(z.string()),
    section: z.optional(z.string()),
});