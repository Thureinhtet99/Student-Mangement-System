import {
  Announcement,
  Assignment,
  Class,
  Event,
  Exam,
  Lesson,
  Parent,
  Result,
  Student,
  Subject,
  Teacher,
  Attendance,
  Grade,
} from "@prisma/client";

export type FormContainerType = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
  relatedData?: any;
};

export type PaginationType = {
  currentPage?: number;
  page?: number;
  count?: number;
  hasNextPage: boolean;
};

export type UserCardType = {
  type: "admin" | "teacher" | "student" | "parent";
  // count: number;
  year: string;
};

export type AnnouncementListType = Announcement & {
  class?: Class | null | undefined;
};

export type CustomTitleType = {
  name: string;
  fontSize?: any;
  marginY?: any;
};

export type EventListType = Event & { class?: Class | null };

export type TeacherListType = Teacher & {
  subjects: Subject[];
  classes: Class[];
};

export type StudentListType = Student & {
  parent?: Parent | null;
  class?: Class | null;
  grade?: Grade | null;
  attendances?: Attendance[];
  results?: Result[];
};

export type ParentListType = Parent & {
  students: Student[];
};

export type SubjectListType = Subject & {
  teachers: Teacher[];
  lessons: Lesson[];
};

export type ClassListType = Class & {
  teacher?: Teacher | null;
  subjects: Subject[];
  students: Student[];
  events: Event[];
  announcements: Announcement[];
  attendances: Attendance[];
};

export type LessonListType = Lesson & {
  subject: Subject;
};

export type ExamListType = Exam & {
  subject: Subject & {
    class?: (Class & { teacher?: Teacher | null }) | null;
  };
  results: Result[];
};

export type AssignmentListType = Assignment & {
  subject: Subject & { class?: (Class & { teacher?: Teacher | null }) | null };
  results: Result[];
};

export type ResultListType = {
  id: number;
  score: number;
  title: string;
  studentName: string;
  className?: string;
  teacherName?: string;
  startTime: Date;
  dueDate?: Date | null;
};

export type AttendanceListType = Attendance & {
  student: Student;
  class?: Class;
};

export type GradeListType = Grade & {
  students: Student[];
};
