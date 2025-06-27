import { FormContainerType } from "@/types";
import FormModal from "./FormModal";
import prisma from "@/lib/prisma";

const FormContainer = async ({ table, type, data, id }: FormContainerType) => {
  let relatedData: Record<string, any> = {};

  if (type !== "delete") {
    try {
      switch (table) {
        case "subject":
          const teachersForSubject = await prisma.teacher.findMany({
            orderBy: { name: "asc" },
            select: {
              id: true,
              name: true,
            },
          });
          relatedData = { teachers: teachersForSubject };
          break;
        case "class":
          const teachersForClass = await prisma.teacher.findMany({
            orderBy: { name: "asc" },
            select: {
              id: true,
              name: true,
            },
          });
          relatedData = { teachers: teachersForClass };
          break;
        case "teacher":
          const subjectsForTeacher = await prisma.subject.findMany({
            orderBy: { name: "asc" },
            select: {
              id: true,
              name: true,
            },
          });
          relatedData = { subjects: subjectsForTeacher };
          break;
        case "student":
          const classesForTeacher = await prisma.class.findMany({
            orderBy: { name: "asc" },
            select: {
              id: true,
              name: true,
            },
          });
          relatedData = { classes: classesForTeacher };
          break;
        case "parent":
          const studentsForParent = await prisma.student.findMany({
            orderBy: { name: "asc" },
            select: {
              id: true,
              name: true,
            },
          });
          relatedData = { students: studentsForParent };
          break;
        // Add other cases for different tables here

        default:
          // No related data needed for this table
          break;
      }
    } catch (error) {
      relatedData = {};
    }
  }

  return (
    <FormModal
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  );
};

export default FormContainer;
