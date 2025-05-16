export type PaginationType = {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

export type UserCardType = {
  type: string;
  count: number;
  year?: string;
};

export type AnnouncementType = {
  id: number;
  title: string;
  class: string;
  date: string;
};

export type CustomTitleType = {
  name: string;
  fontSize: string | "";
  marginY: string | "";
};

export type EventType = {
  title: string;
  time: string | "";
  description: string | "";
  type: string | "";
};

export type EventListType = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

export type TeacherType = {
  id: number;
  teacherId: string;
  name: string;
  email?: string | "";
  photo: string;
  phone?: string | "";
  subjects: string[];
  classes: string[];
  address?: string | "";
};

export type StudentType = {
  id: number;
  studentId: string;
  name: string;
  email?: string | "";
  photo: string;
  phone?: string | "";
  grade: number;
  class: string;
  address?: string | "";
};
export type ParentType = {
  id: number;
  name: string;
  students: string[];
  email?: string | "";
  phone?: string | "";
  address?: string | "";
};

export type SubjectType = {
  id: number;
  name: string;
  teachers: string[];
};

export type ClassType = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

export type LessonType = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
};

export type ExamType = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
};

export type AssignmentType = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
};

export type ResultType = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  type: "exam" | "assignment";
  // type: string;
  date: string;
  score: number;
};
