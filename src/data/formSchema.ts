import { z } from "zod";

export const teacherFormSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .optional(),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .optional(),
  name: z.string().nonempty({ message: "Name is required" }),
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
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .optional(),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z.string().nonempty({ message: "Name is required" }),
  phone: z.string().optional(),
  bloodType: z.string().optional(),
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
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .optional(),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z.string().nonempty({ message: "Name is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthday: z.date().optional(),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  image: z.instanceof(File).optional(),
});

export const lessonFormSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  subjectId: z.number().int().optional(),
  classId: z.number().int().optional(),
});

export const examFormSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  startTime: z.string().optional(),
  dueTime: z.string().optional(),
  lessonId: z.number().int().optional(),
});

export const assignmentFormSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  // startDate: z.string().optional(),
  dueDate: z.string().optional(),
  lessonId: z.number().int().optional(),
});

export const eventFormSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  classId: z.number().int().optional(),
});

export const announcementFormSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().optional(),
  date: z.string().optional(),
  classId: z.number().int().optional(),
});
