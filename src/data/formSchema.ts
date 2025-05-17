import { z } from "zod";

export const teacherFormSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthday: z.date().optional(),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  image: z.instanceof(File).optional(),
});

export const studentFormSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthday: z.date().optional(),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  image: z.instanceof(File).optional(),
});

export const parentFormSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthday: z.date().optional(),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  image: z.instanceof(File).optional(),
});
