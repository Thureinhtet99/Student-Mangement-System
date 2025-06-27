"use server";

import { revalidatePath } from "next/cache";
import {
  ClassFormSchema,
  SubjectFormSchema,
  TeacherFormSchema,
  StudentFormSchema,
  ParentFormSchema,
  LessonFormSchema,
  ExamFormSchema,
  AssignmentFormSchema,
  EventFormSchema,
  AnnouncementFormSchema,
  AttendanceFormSchema,
  ResultFormSchema,
  MessageFormSchema,
} from "./formSchema";
import prisma from "./prisma";
// import { clerkClient } from "@clerk/nextjs/server";

// Teacher
export const getTeachers = async () => {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { name: "asc" },
    });

    return { teachers, success: true };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get teachers"
    );
  }
};

export const createTeacher = async (data: TeacherFormSchema) => {
  try {
    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        name: {
          equals: data.name.trim(),
          mode: "insensitive",
        },
      },
    });
    if (existingTeacher)
      throw new Error("Teacher with this name already exists");

    const teacher = await prisma.teacher.create({
      data: {
        username: data.username || null,
        email: data.email || null,
        name: data.name,
        phone: data.phone || null,
        address: data.address || null,
        birthday: data.birthday
          ? new Date(data.birthday).toISOString()
          : undefined,
        gender: data.gender.toUpperCase() as "MALE" | "FEMALE",
        subjects: {
          connect: (data.subjects || []).map((subjectId) => ({
            id: subjectId,
          })),
        },
        image: data.image || null,
      },
    });

    // const client = await clerkClient();
    // const teacher = await client.users.createUser({
    //   username: data.username || "",
    //   email: data.email || "",
    //   name: data.name,
    //   phone: data.phone || "",
    //   address: data.address || "",
    //   birthday: data.birthday ? new Date(data.birthday).toISOString() : "",
    //   gender: data.gender.toUpperCase() as "MALE" | "FEMALE",
    //   subjects: {
    //     connect: (data.subjects || []).map((subjectId) => ({
    //       id: subjectId,
    //     })),
    //   },
    //   image: data.image || "",
    // });

    revalidatePath("/list/teachers");

    return {
      teacher,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create teacher"
    );
  }
};

export const updateTeacher = async (data: TeacherFormSchema) => {
  try {
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id: data.id },
    });
    if (!existingTeacher) throw new Error("Teacher is not found");

    if (existingTeacher.name.toLowerCase() !== data.name.toLowerCase()) {
      const duplicateTeacher = await prisma.teacher.findFirst({
        where: {
          name: {
            equals: data.name.trim(),
            mode: "insensitive",
          },
          NOT: { id: data.id },
        },
      });
      if (duplicateTeacher)
        throw new Error("Teacher with this name already exists");
    }

    const teacher = await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username || null,
        email: data.email || null,
        name: data.name,
        phone: data.phone || null,
        address: data.address || null,
        birthday: data.birthday
          ? new Date(data.birthday).toISOString()
          : undefined,
        gender: data.gender.toUpperCase() as "MALE" | "FEMALE",
        subjects: {
          set: (data.subjects || []).map((subjectId) => ({
            id: Number(subjectId),
          })),
        },
        image: data.image || null,
      },
    });

    revalidatePath("/list/teachers");

    return {
      teacher,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update teacher"
    );
  }
};

export const deleteTeacher = async ({ id }: { id: string }) => {
  try {
    const existingTeacher = await prisma.teacher.findFirst({
      where: { id },
    });
    if (!existingTeacher) throw new Error("Teacher is not found");

    await prisma.teacher.delete({
      where: { id },
    });

    revalidatePath("/list/teachers");

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete teacher"
    );
  }
};

// Students
export const getStudents = async () => {
  try {
    const students = await prisma.student.findMany({
      orderBy: { name: "asc" },
    });

    return { students, success: true };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get students"
    );
  }
};

export const createStudent = async (data: StudentFormSchema) => {
  try {
    const existingStudent = await prisma.student.findFirst({
      where: {
        name: {
          equals: data.name.trim(),
          mode: "insensitive",
        },
      },
    });
    if (existingStudent)
      throw new Error("Student with this name already exists");

    const student = await prisma.student.create({
      data: {
        username: data.username || null,
        email: data.email || null,
        name: data.name,
        phone: data.phone || null,
        address: data.address || null,
        birthday: data.birthday
          ? new Date(data.birthday).toISOString()
          : undefined,
        gender: data.gender.toUpperCase() as "MALE" | "FEMALE",
        class: data.classId
          ? {
              connect: { id: data.classId },
            }
          : undefined,
      },
    });

    // const client = await clerkClient();
    // const teacher = await client.users.createUser({
    //   username: data.username || "",
    //   email: data.email || "",
    //   name: data.name,
    //   phone: data.phone || "",
    //   address: data.address || "",
    //   birthday: data.birthday ? new Date(data.birthday).toISOString() : "",
    //   gender: data.gender.toUpperCase() as "MALE" | "FEMALE",
    //   subjects: {
    //     connect: (data.subjects || []).map((subjectId) => ({
    //       id: subjectId,
    //     })),
    //   },
    //   image: data.image || "",
    // });

    revalidatePath("/list/students");

    return {
      student,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create student"
    );
  }
};

export const updateStudent = async (data: StudentFormSchema) => {
  try {
    const existingStudent = await prisma.student.findUnique({
      where: { id: data.id },
    });
    if (!existingStudent) throw new Error("Student is not found");

    if (existingStudent.name.toLowerCase() !== data.name.toLowerCase()) {
      const duplicateStudent = await prisma.student.findFirst({
        where: {
          name: {
            equals: data.name.trim(),
            mode: "insensitive",
          },
          NOT: { id: data.id },
        },
      });
      if (duplicateStudent)
        throw new Error("Student with this name already exists");
    }

    const student = await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username || null,
        email: data.email || null,
        name: data.name,
        phone: data.phone || null,
        address: data.address || null,
        birthday: data.birthday
          ? new Date(data.birthday).toISOString()
          : undefined,
        gender: data.gender.toUpperCase() as "MALE" | "FEMALE",
        image: data.image || null,
        class: data.classId
          ? {
              connect: { id: data.classId },
            }
          : undefined,
      },
    });

    revalidatePath("/list/students");

    return {
      student,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update student"
    );
  }
};

export const deleteStudent = async ({ id }: { id: string }) => {
  try {
    const existingStudent = await prisma.student.findFirst({
      where: { id },
    });
    if (!existingStudent) throw new Error("Student is not found");

    await prisma.student.delete({
      where: { id },
    });

    revalidatePath("/list/students");

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete student"
    );
  }
};

// Class
export const getClasses = async () => {
  try {
    const classes = await prisma.class.findMany({
      orderBy: { name: "asc" },
    });

    return { classes, success: true, error: false };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get classes"
    );
  }
};

export const getClassById = async (id: number) => {
  try {
    const classById = await prisma.class.findUnique({
      where: { id },
    });

    return { classById, success: true, error: false };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get class"
    );
  }
};

export const createClass = async (data: ClassFormSchema) => {
  try {
    const existingClass = await prisma.class.findFirst({
      where: {
        name: {
          equals: data.name.trim(),
          mode: "insensitive",
        },
      },
    });
    if (existingClass) throw new Error("Class with this name already exists");

    const createClass = await prisma.class.create({
      data: {
        name: data.name,
        capacity: data.capacity || 0,
        teacher: data.teacherId
          ? {
              connect: { id: data.teacherId },
            }
          : undefined,
      },
    });

    revalidatePath("/list/classes");

    return {
      createClass,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create class"
    );
  }
};

export const updateClass = async (data: ClassFormSchema) => {
  try {
    const existingClass = await prisma.class.findFirst({
      where: {
        name: {
          equals: data.name.trim(),
          mode: "insensitive",
        },
      },
    });
    if (existingClass && existingClass.id !== data.id)
      throw new Error("Class with this name already exists");

    const updateClass = await prisma.class.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        capacity: data.capacity || 0,
        teacher: data.teacherId
          ? {
              connect: { id: data.teacherId },
            }
          : undefined,
      },
    });

    revalidatePath("/list/classes");

    return {
      updateClass,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update class"
    );
  }
};

export const deleteClass = async ({ id }: { id: number }) => {
  try {
    const existingClass = await prisma.class.findFirst({
      where: { id },
    });
    if (!existingClass) throw new Error("Class is not found");

    await prisma.class.delete({
      where: { id },
    });

    revalidatePath("/list/classes");

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete class"
    );
  }
};

// Subject
export const getSubjects = async () => {
  try {
    const subjects = await prisma.subject.findMany({
      orderBy: { name: "asc" },
    });

    return { subjects, success: true, error: false };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get subjects"
    );
  }
};

// export const getSubjectById = async (id: number) => {
//   try {
//     const subject = await prisma.subject.findUnique({
//       where: { id },
//     });

//     return { subject, success: true, error: false };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to get subject"
//     );
//   }
// };

export const createSubject = async (data: SubjectFormSchema) => {
  try {
    const existingSubject = await prisma.subject.findFirst({
      where: {
        name: {
          equals: data.name.trim(),
          mode: "insensitive",
        },
      },
    });
    if (existingSubject)
      throw new Error("Subject with this name already exists");

    const subject = await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: (data.teachers || []).map((teacherId) => ({
            id: teacherId,
          })),
        },
        description: data.description || null,
      },
    });

    revalidatePath("/list/subjects");

    return {
      subject,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create subject"
    );
  }
};

export const updateSubject = async (data: SubjectFormSchema) => {
  try {
    const existingSubject = await prisma.subject.findFirst({
      where: {
        name: {
          equals: data.name.trim(),
          mode: "insensitive",
        },
      },
    });
    if (existingSubject && existingSubject.id !== data.id)
      throw new Error("Subject with this name already exists");

    const subject = await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: (data.teachers || []).map((teacherId) => ({
            id: teacherId,
          })),
        },
        description: data.description || null,
      },
    });

    revalidatePath("/list/subjects");

    return {
      subject,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update subject"
    );
  }
};

export const deleteSubject = async ({ id }: { id: number }) => {
  try {
    const existingSubject = await prisma.subject.findFirst({
      where: { id },
    });
    if (!existingSubject) throw new Error("Subject is not found");

    await prisma.subject.delete({
      where: { id },
    });

    revalidatePath("/list/subjects");

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete subject"
    );
  }
};

// Parent
export const getParents = async () => {
  try {
    const parents = await prisma.parent.findMany({
      orderBy: { name: "asc" },
    });

    return { parents, success: true };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get parents"
    );
  }
};

export const createParent = async (data: ParentFormSchema) => {
  
  try {
    const existingParent = await prisma.parent.findFirst({
      where: {
        name: {
          equals: data.name.trim(),
          mode: "insensitive",
        },
      },
    });
    if (existingParent) throw new Error("Parent with this name already exists");

    const parent = await prisma.parent.create({
      data: {
        username: data.username || null,
        email: data.email || null,
        name: data.name,
        phone: data.phone || null,
        address: data.address || null,
        students: {
          connect: (data.students || []).map((studentId) => ({
            id: studentId,
          })),
        },
      },
    });

    // clearkClient

    revalidatePath("/list/parents");

    return {
      parent,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create parent"
    );
  }
};

export const updateParent = async (data: ParentFormSchema) => {
  try {
    const existingParent = await prisma.parent.findUnique({
      where: { id: data.id },
    });
    if (!existingParent) throw new Error("Parent is not found");

    if (existingParent.name.toLowerCase() !== data.name.toLowerCase()) {
      const duplicateParent = await prisma.parent.findFirst({
        where: {
          name: {
            equals: data.name.trim(),
            mode: "insensitive",
          },
          NOT: { id: data.id },
        },
      });
      if (duplicateParent)
        throw new Error("Parent with this name already exists");
    }

    const parent = await prisma.parent.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username || null,
        email: data.email || null,
        name: data.name,
        phone: data.phone || null,
        address: data.address || null,
        students: {
          set: (data.students || []).map((studentId) => ({
            id: studentId,
          })),
        },
      },
    });

    revalidatePath("/list/parents");

    return {
      parent,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update parent"
    );
  }
};

export const deleteParent = async ({ id }: { id: string }) => {
  try {
    const existingParent = await prisma.parent.findFirst({
      where: { id },
    });
    if (!existingParent) throw new Error("Parent is not found");

    await prisma.parent.delete({
      where: { id },
    });

    revalidatePath("/list/parents");

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete parent"
    );
  }
};

// Lesson
export const getLessons = async () => {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { name: "asc" },
      include: {
        subject: true,
      },
    });

    return { lessons, success: true, error: false };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get lessons"
    );
  }
};

export const createLesson = async (data: LessonFormSchema) => {
  try {
    if (!data.subjectId) throw new Error("Subject is required");

    const lesson = await prisma.lesson.create({
      data: {
        name: data.name,
        subjectId: data.subjectId,
      },
    });

    revalidatePath("/list/lessons");

    return {
      lesson,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create lesson"
    );
  }
};

export const updateLesson = async (data: LessonFormSchema) => {
  try {
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: data.id },
    });
    if (!existingLesson) throw new Error("Lesson is not found");

    const lesson = await prisma.lesson.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        subjectId: data.subjectId || existingLesson.subjectId,
      },
    });

    revalidatePath("/list/lessons");

    return {
      lesson,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update lesson"
    );
  }
};

export const deleteLesson = async ({ id }: { id: number }) => {
  try {
    const existingLesson = await prisma.lesson.findFirst({
      where: { id },
    });
    if (!existingLesson) throw new Error("Lesson is not found");

    await prisma.lesson.delete({
      where: { id },
    });

    revalidatePath("/list/lessons");

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete lesson"
    );
  }
};

// Exam
export const getExams = async () => {
  try {
    const exams = await prisma.exam.findMany({
      orderBy: { title: "asc" },
      include: {
        subject: true,
      },
    });

    return { exams, success: true, error: false };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get exams"
    );
  }
};

export const createExam = async (data: ExamFormSchema) => {
  try {
    if (!data.subjectId) throw new Error("Subject is required");

    const exam = await prisma.exam.create({
      data: {
        title: data.title,
        description: data.description || null,
        startTime: data.startTime ? new Date(data.startTime) : new Date(),
        endTime: data.endTime ? new Date(data.endTime) : new Date(),
        subjectId: data.subjectId,
      },
    });

    revalidatePath("/list/exams");

    return {
      exam,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create exam"
    );
  }
};

export const updateExam = async (data: ExamFormSchema) => {
  try {
    const existingExam = await prisma.exam.findUnique({
      where: { id: data.id },
    });
    if (!existingExam) throw new Error("Exam is not found");

    const exam = await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description || null,
        startTime: data.startTime ? new Date(data.startTime) : undefined,
        endTime: data.endTime ? new Date(data.endTime) : undefined,
        subjectId: data.subjectId || existingExam.subjectId,
      },
    });

    revalidatePath("/list/exams");

    return {
      exam,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update exam"
    );
  }
};

export const deleteExam = async ({ id }: { id: number }) => {
  try {
    const existingExam = await prisma.exam.findFirst({
      where: { id },
    });
    if (!existingExam) throw new Error("Exam is not found");

    await prisma.exam.delete({
      where: { id },
    });

    revalidatePath("/list/exams");

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete exam"
    );
  }
};

// Assignment
export const getAssignments = async () => {
  try {
    const assignments = await prisma.assignment.findMany({
      orderBy: { title: "asc" },
      include: {
        subject: true,
      },
    });

    return { assignments, success: true, error: false };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get assignments"
    );
  }
};

export const createAssignment = async (data: AssignmentFormSchema) => {
  try {
    if (!data.subjectId) throw new Error("Subject is required");

    const assignment = await prisma.assignment.create({
      data: {
        title: data.title,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        subjectId: data.subjectId,
      },
    });

    revalidatePath("/list/assignments");

    return {
      assignment,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create assignment"
    );
  }
};

export const updateAssignment = async (data: AssignmentFormSchema) => {
  try {
    const existingAssignment = await prisma.assignment.findUnique({
      where: { id: data.id },
    });
    if (!existingAssignment) throw new Error("Assignment is not found");

    const assignment = await prisma.assignment.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        subjectId: data.subjectId || existingAssignment.subjectId,
      },
    });

    revalidatePath("/list/assignments");

    return {
      assignment,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update assignment"
    );
  }
};

export const deleteAssignment = async ({ id }: { id: number }) => {
  try {
    const existingAssignment = await prisma.assignment.findFirst({
      where: { id },
    });
    if (!existingAssignment) throw new Error("Assignment is not found");

    await prisma.assignment.delete({
      where: { id },
    });

    revalidatePath("/list/assignments");

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete assignment"
    );
  }
};

// Result
// export const getResults = async () => {
//   try {
//     const results = await prisma.result.findMany({
//       orderBy: { score: "desc" },
//       include: {
//         student: true,
//         exam: true,
//         assignment: true,
//       },
//     });

//     return { results, success: true, error: false };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to get results"
//     );
//   }
// };

// export const createResult = async (data: ResultFormSchema) => {
//   try {
//     if (!data.examId && !data.assignmentId) {
//       throw new Error("Either exam or assignment is required");
//     }

//     const result = await prisma.result.create({
//       data: {
//         score: data.score,
//         comment: data.comment || null,
//         studentId: data.studentId,
//         examId: data.examId || undefined,
//         assignmentId: data.assignmentId || undefined,
//       },
//     });

//     revalidatePath("/list/results");

//     return {
//       result,
//       success: true,
//       error: false,
//     };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to create result"
//     );
//   }
// };

// export const updateResult = async (data: ResultFormSchema) => {
//   try {
//     const existingResult = await prisma.result.findUnique({
//       where: { id: data.id },
//     });
//     if (!existingResult) throw new Error("Result is not found");

//     const result = await prisma.result.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         score: data.score,
//         comment: data.comment || null,
//         student: {
//           connect: { id: data.studentId },
//         },
//         exam: data.examId
//           ? {
//               connect: { id: data.examId },
//             }
//           : undefined,
//         assignment: data.assignmentId
//           ? {
//               connect: { id: data.assignmentId },
//             }
//           : undefined,
//       },
//     });

//     revalidatePath("/list/results");

//     return {
//       result,
//       success: true,
//       error: false,
//     };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to update result"
//     );
//   }
// };

// export const deleteResult = async ({ id }: { id: number }) => {
//   try {
//     const existingResult = await prisma.result.findFirst({
//       where: { id },
//     });
//     if (!existingResult) throw new Error("Result is not found");

//     await prisma.result.delete({
//       where: { id },
//     });

//     revalidatePath("/list/results");

//     return {
//       success: true,
//       error: false,
//     };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to delete result"
//     );
//   }
// };

// Attendance
export const getAttendances = async () => {
  try {
    const attendances = await prisma.attendance.findMany({
      orderBy: { date: "desc" },
      include: {
        student: true,
        Class: true,
      },
    });

    return { attendances, success: true, error: false };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get attendances"
    );
  }
};

export const createAttendance = async (data: AttendanceFormSchema) => {
  try {
    const attendance = await prisma.attendance.create({
      data: {
        present: data.present,
        date: new Date(data.date),
        student: {
          connect: { id: data.studentId },
        },
        Class: data.classId
          ? {
              connect: { id: data.classId },
            }
          : undefined,
      },
    });

    revalidatePath("/list/attendances");

    return {
      attendance,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create attendance"
    );
  }
};

export const updateAttendance = async (data: AttendanceFormSchema) => {
  try {
    const existingAttendance = await prisma.attendance.findUnique({
      where: { id: data.id },
    });
    if (!existingAttendance) throw new Error("Attendance is not found");

    const attendance = await prisma.attendance.update({
      where: {
        id: data.id,
      },
      data: {
        present: data.present,
        date: new Date(data.date),
        student: {
          connect: { id: data.studentId },
        },
        Class: data.classId
          ? {
              connect: { id: data.classId },
            }
          : undefined,
      },
    });

    revalidatePath("/list/attendances");

    return {
      attendance,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update attendance"
    );
  }
};

export const deleteAttendance = async ({ id }: { id: number }) => {
  try {
    const existingAttendance = await prisma.attendance.findFirst({
      where: { id },
    });
    if (!existingAttendance) throw new Error("Attendance is not found");

    await prisma.attendance.delete({
      where: { id },
    });

    revalidatePath("/list/attendances");

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete attendance"
    );
  }
};

// Event
export const getEvents = async () => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { title: "asc" },
      include: {
        class: true,
      },
    });

    return { events, success: true, error: false };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get events"
    );
  }
};

export const createEvent = async (data: EventFormSchema) => {
  try {
    const event = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description || null,
        startTime: data.startTime ? new Date(data.startTime) : null,
        endTime: data.endTime ? new Date(data.endTime) : null,
        class: data.classId
          ? {
              connect: { id: data.classId },
            }
          : undefined,
      },
    });

    revalidatePath("/list/events");

    return {
      event,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create event"
    );
  }
};

export const updateEvent = async (data: EventFormSchema) => {
  try {
    const existingEvent = await prisma.event.findUnique({
      where: { id: data.id },
    });
    if (!existingEvent) throw new Error("Event is not found");

    const event = await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description || null,
        startTime: data.startTime ? new Date(data.startTime) : null,
        endTime: data.endTime ? new Date(data.endTime) : null,
        class: data.classId
          ? {
              connect: { id: data.classId },
            }
          : undefined,
      },
    });

    revalidatePath("/list/events");

    return {
      event,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update event"
    );
  }
};

export const deleteEvent = async ({ id }: { id: number }) => {
  try {
    const existingEvent = await prisma.event.findFirst({
      where: { id },
    });
    if (!existingEvent) throw new Error("Event is not found");

    await prisma.event.delete({
      where: { id },
    });

    revalidatePath("/list/events");

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete event"
    );
  }
};

// Announcement
export const getAnnouncements = async () => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { title: "asc" },
      include: {
        class: true,
      },
    });

    return { announcements, success: true, error: false };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get announcements"
    );
  }
};

export const createAnnouncement = async (data: AnnouncementFormSchema) => {
  try {
    const announcement = await prisma.announcement.create({
      data: {
        title: data.title,
        description: data.description || null,
        date: data.date ? new Date(data.date) : null,
        class: data.classId
          ? {
              connect: { id: data.classId },
            }
          : undefined,
      },
    });

    revalidatePath("/list/announcements");

    return {
      announcement,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to create announcement"
    );
  }
};

export const updateAnnouncement = async (data: AnnouncementFormSchema) => {
  try {
    const existingAnnouncement = await prisma.announcement.findUnique({
      where: { id: data.id },
    });
    if (!existingAnnouncement) throw new Error("Announcement is not found");

    const announcement = await prisma.announcement.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description || null,
        date: data.date ? new Date(data.date) : null,
        class: data.classId
          ? {
              connect: { id: data.classId },
            }
          : undefined,
      },
    });

    revalidatePath("/list/announcements");

    return {
      announcement,
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update announcement"
    );
  }
};

export const deleteAnnouncement = async ({ id }: { id: number }) => {
  try {
    const existingAnnouncement = await prisma.announcement.findFirst({
      where: { id },
    });
    if (!existingAnnouncement) throw new Error("Announcement is not found");

    await prisma.announcement.delete({
      where: { id },
    });

    revalidatePath("/list/announcements");

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete announcement"
    );
  }
};

// Message
// export const getMessages = async () => {
//   try {
//     const messages = await prisma.message.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     return { messages, success: true, error: false };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to get messages"
//     );
//   }
// };

// export const getMessagesByUser = async (userId: string) => {
//   try {
//     const messages = await prisma.message.findMany({
//       where: {
//         OR: [{ senderId: userId }, { receiverId: userId }],
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     return { messages, success: true, error: false };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to get messages"
//     );
//   }
// };

// export const createMessage = async (data: MessageFormSchema) => {
//   try {
//     const message = await prisma.message.create({
//       data: {
//         title: data.title,
//         content: data.content,
//         senderId: data.senderId,
//         receiverId: data.receiverId,
//         read: data.read || false,
//       },
//     });

//     revalidatePath("/list/messages");

//     return {
//       message,
//       success: true,
//       error: false,
//     };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to create message"
//     );
//   }
// };

// export const updateMessage = async (data: MessageFormSchema) => {
//   try {
//     const existingMessage = await prisma.message.findUnique({
//       where: { id: data.id },
//     });
//     if (!existingMessage) throw new Error("Message is not found");

//     const message = await prisma.message.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         title: data.title,
//         content: data.content,
//         read: data.read || false,
//       },
//     });

//     revalidatePath("/list/messages");

//     return {
//       message,
//       success: true,
//       error: false,
//     };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to update message"
//     );
//   }
// };

// export const markMessageAsRead = async ({ id }: { id: number }) => {
//   try {
//     const existingMessage = await prisma.message.findUnique({
//       where: { id },
//     });
//     if (!existingMessage) throw new Error("Message is not found");

//     const message = await prisma.message.update({
//       where: { id },
//       data: {
//         read: true,
//       },
//     });

//     revalidatePath("/list/messages");

//     return {
//       message,
//       success: true,
//       error: false,
//     };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to mark message as read"
//     );
//   }
// };

// export const deleteMessage = async ({ id }: { id: number }) => {
//   try {
//     const existingMessage = await prisma.message.findFirst({
//       where: { id },
//     });
//     if (!existingMessage) throw new Error("Message is not found");

//     await prisma.message.delete({
//       where: { id },
//     });

//     revalidatePath("/list/messages");

//     return {
//       success: true,
//       error: false,
//     };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to delete message"
//     );
//   }
// };
