import { PrismaClient, UserGender } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Get password from environment variable
  const defaultPassword =
    process.env.DEFAULT_ADMIN_PASSWORD || "defaultpassword";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // ADMIN
  await prisma.admin.create({
    data: {
      id: "admin",
      username: "admin",
      name: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // GRADE
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.create({
      data: {
        level: i,
      },
    });
  }

  // CLASS
  for (let i = 1; i <= 15; i++) {
    await prisma.class.create({
      data: {
        name: `class${i}`,
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
    });
  }

  // // SUBJECT
  // const subjectData = [
  //   { name: "Mathematics" },
  //   { name: "Science" },
  //   { name: "English" },
  //   { name: "History" },
  //   { name: "Geography" },
  //   { name: "Physics" },
  //   { name: "Chemistry" },
  //   { name: "Biology" },
  //   { name: "Computer Science" },
  //   { name: "Art" },
  // ];

  for (let i = 1; i <= 10; i++) {
    await prisma.subject.create({
      data: {
        name: `subject${i}`,
      },
    });
  }

  // // TEACHER
  for (let i = 1; i <= 15; i++) {
    await prisma.teacher.create({
      data: {
        id: `teacherId${i}`,
        username: `teacher${i}`,
        name: `teacher${i}`,
        email: `teacher${i}@gmail.com`,
        phone: `12345678${i}`,
        address: `Address${i}`,
        gender: i % 2 === 0 ? UserGender.MALE : UserGender.FEMALE,
        subjects: { connect: [{ id: (i % 10) + 1 }] },
        classes: { connect: [{ id: (i % 15) + 1 }] },
        birthday: new Date(
          new Date().setFullYear(new Date().getFullYear() - 30)
        ),
      },
    });
  }

  // // Update classes to assign teachers
  // for (let i = 1; i <= 6; i++) {
  //   await prisma.class.update({
  //     where: { id: i },
  //     data: {
  //       teacherId: `teacher${i}`,
  //     },
  //   });
  // }

  // // LESSON
  // for (let i = 1; i <= 30; i++) {
  //   await prisma.lesson.create({
  //     data: {
  //       name: `Lesson${i}`,
  //       subjectId: (i % 10) + 1,
  //     },
  //   });
  // }

  // // PARENT
  for (let i = 1; i <= 25; i++) {
    await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        username: `parent${i}`,
        name: `parent${i}`,
        email: `parent${i}@gmail.com`,
        phone: `12345678${i}`,
        address: `Address${i}`,
      },
    });
  }

  // // STUDENT
  for (let i = 1; i <= 50; i++) {
    await prisma.student.create({
      data: {
        id: `studentId${i}`,
        username: `student${i}`,
        name: `student${i}`,
        email: `student${i}@gmail.com`,
        phone: `12345678${i}`,
        address: `Address${i}`,
        gender: i % 2 === 0 ? UserGender.MALE : UserGender.FEMALE,
        parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`,
        gradeId: (i % 6) + 1,
        classId: (i % 6) + 1,
        birthday: new Date(
          new Date().setFullYear(new Date().getFullYear() - 10)
        ),
      },
    });
  }

  // // EXAM
  // for (let i = 1; i <= 10; i++) {
  //   await prisma.exam.create({
  //     data: {
  //       name: `Exam ${i}`,
  //       startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
  //       endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
  //       subjectId: (i % 10) + 1,
  //     },
  //   });
  // }

  // // ASSIGNMENT
  // for (let i = 1; i <= 10; i++) {
  //   await prisma.assignment.create({
  //     data: {
  //       name: `Assignment ${i}`,
  //       dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  //       subjectId: (i % 10) + 1,
  //     },
  //   });
  // }

  // // RESULT - Fix to handle optional examId and assignmentId
  // for (let i = 1; i <= 10; i++) {
  //   await prisma.result.create({
  //     data: {
  //       score: 90,
  //       studentId: `student${i}`,
  //       examId: i <= 5 ? i : 1,
  //       assignmentId: i > 5 ? i - 5 : 1,
  //     },
  //   });
  // }

  // // ATTENDANCE
  // for (let i = 1; i <= 10; i++) {
  //   await prisma.attendance.create({
  //     data: {
  //       date: new Date(),
  //       present: true,
  //       studentId: `student${i}`,
  //     },
  //   });
  // }

  // // EVENT
  // for (let i = 1; i <= 5; i++) {
  //   await prisma.event.create({
  //     data: {
  //       name: `Event ${i}`,
  //       description: `Description for Event ${i}`,
  //       startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
  //       endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
  //       classId: (i % 5) + 1,
  //     },
  //   });
  // }

  // // ANNOUNCEMENT
  // for (let i = 1; i <= 5; i++) {
  //   await prisma.announcement.create({
  //     data: {
  //       name: `Announcement ${i}`,
  //       description: `Description for Announcement ${i}`,
  //       date: new Date(),
  //       classId: (i % 5) + 1,
  //     },
  //   });
  // }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
