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
  title: z.string().min(1, {
    message: "title is required",
  }),
  link: z.string().min(1, {
    message: "live link is required",
  }),
  description: z.string().min(1, {
    message: "description is required",
  }),
  category: z.array(z.string()).min(1, {
    message: "At least one category is required",
  }),
  images: z.array(z.instanceof(File)),
});

export const CvSchema = z.object({
  link: z.string().min(1, {
    message: "Cv Link is required",
  }),
});
export const CategorySchema = z.object({
  categoryName: z.string().min(1, {
    message: "Category Name is required",
  }),
  precedence: z.string().min(1, {
    message: "precedence is required",
  }),
});
export const ContactSchema = z.object({
  name: z.string().min(1, {
    message: "name is required",
  }),
  email: z.string().min(1, {
    message: "email is required",
  }),
  // phone: z.string().min(1, {
  // 	message: "phone number is required",
  // }),
  details: z.string().min(1, {
    message: "name is required",
  }),
});
