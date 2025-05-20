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
} from "@prisma/client";

export type PaginationType = {
  currentPage?: number;
  page?: number;
  count?: number;
  hasNextPage: boolean;
  onPageChange?: (page: number) => void;
};

export type UserCardType = {
  type: string;
  count: number;
  year?: string;
};

export type AnnouncementListType = Announcement & {
  class: Class | null | undefined;
};

export type CustomTitleType = {
  name: string;
  fontSize: string | "";
  marginY: string | "";
};

// export type EventType = {
//   title: string;
//   time: string | "";
//   description: string | "";
//   type: string | "";
// };

export type EventListType = Event & { class: Class | null | undefined };

export type TeacherListType = Teacher & { subjects: Subject[] } & {
  classes: Class[];
};
export type StudentListType = Student;
export type ParentListType = Parent & { students: Student[] };
export type SubjectListType = Subject & { teachers: Teacher[] } & {
  lessons: Lesson[];
};

export type ClassListType = Class & { teacher?: Teacher | null | undefined } & {
  lessons: Lesson[];
} & {
  students: Student[];
};

export type LessonListType = Lesson & { subject: Subject } & {
  class: Class;
} & { teacher: Teacher };

export type ExamListType = Exam & {
  lesson: { subject: Subject; class: Class; teacher: Teacher };
};

export type AssignmentListType = Assignment & {
  lesson: { subject: Subject; class: Class; teacher: Teacher };
};

export type ResultListType = Result & {
  exam: { lesson: Lesson; class: Class };
} & { assignment: Assignment } & { student: Student };
