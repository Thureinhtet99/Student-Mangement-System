import { z } from "zod";

export const teacherFormSchema = z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  email: z
    .string()
    .optional()
    .or(z.string().email({ message: "Invalid email address" })),
  password: z
    .string()
    .optional()
    .or(
      z.string().min(8, { message: "Password must be at least 8 characters" })
    ),
  name: z.string().nonempty({ message: "Name is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthday: z.coerce.date().optional(),
  gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required" }),
  image: z.string().optional(),
  subjects: z.array(z.coerce.number()).optional(),
});
export type TeacherFormSchema = z.infer<typeof teacherFormSchema>;

export const studentFormSchema = z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  email: z
    .string()
    .optional()
    .or(z.string().email({ message: "Invalid email address" })),
  password: z
    .string()
    .optional()
    .or(
      z.string().min(8, { message: "Password must be at least 8 characters" })
    ),
  name: z.string().nonempty({ message: "Name is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthday: z.coerce.date().optional(),
  gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required" }),
  image: z.string().optional(),
  classId: z.coerce.number().optional(),
});
export type StudentFormSchema = z.infer<typeof studentFormSchema>;

export const parentFormSchema = z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  email: z
    .string()
    .optional()
    .or(z.string().email({ message: "Invalid email address" })),
  password: z
    .string()
    .optional()
    .or(
      z.string().min(8, { message: "Password must be at least 8 characters" })
    ),
  name: z.string().nonempty({ message: "Name is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  students: z
    .array(z.string())
    .min(1, { message: "At least one student must be selected" }),
});
export type ParentFormSchema = z.infer<typeof parentFormSchema>;

export const subjectFormSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().nonempty({ message: "Name is required" }),
  description: z.string().optional(),
  teachers: z.array(z.string()).optional(),
});
export type SubjectFormSchema = z.infer<typeof subjectFormSchema>;

// Class
export const classFormSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().nonempty({ message: "Name is required" }),
  capacity: z.coerce.number().int().optional(),
  teacherId: z.string().optional(),
});
export type ClassFormSchema = z.infer<typeof classFormSchema>;

export const lessonFormSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().nonempty({ message: "Name is required" }),
  subjectId: z.coerce.number().int().optional(),
  classId: z.coerce.number().int().optional(),
});
export type LessonFormSchema = z.infer<typeof lessonFormSchema>;

export const examFormSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  subjectId: z.coerce.number().int().optional(),
});
export type ExamFormSchema = z.infer<typeof examFormSchema>;

export const assignmentFormSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().nonempty({ message: "Title is required" }),
  dueDate: z.string().optional(),
  subjectId: z.coerce.number().int().optional(),
});
export type AssignmentFormSchema = z.infer<typeof assignmentFormSchema>;

export const eventFormSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  classId: z.coerce.number().int().optional(),
});
export type EventFormSchema = z.infer<typeof eventFormSchema>;

export const announcementFormSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().optional(),
  date: z.string().optional(),
  classId: z.coerce.number().int().optional(),
});
export type AnnouncementFormSchema = z.infer<typeof announcementFormSchema>;

export const attendanceFormSchema = z.object({
  id: z.coerce.number().optional(),
  present: z.boolean(),
  date: z.coerce.date(),
  studentId: z.string(),
  classId: z.coerce.number().int().optional(),
});
export type AttendanceFormSchema = z.infer<typeof attendanceFormSchema>;

export const resultFormSchema = z.object({
  id: z.coerce.number().optional(),
  score: z.coerce.number().int().min(0).max(100),
  comment: z.string().optional(),
  examId: z.coerce.number().int().optional(),
  assignmentId: z.coerce.number().int().optional(),
  studentId: z.string(),
});
export type ResultFormSchema = z.infer<typeof resultFormSchema>;

export const messageFormSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().nonempty({ message: "Title is required" }),
  content: z.string().nonempty({ message: "Content is required" }),
  senderId: z.string(),
  receiverId: z.string(),
  read: z.boolean().default(false),
});
export type MessageFormSchema = z.infer<typeof messageFormSchema>;
