// "use client";

import prisma from "@/lib/prisma";
import Event from "./Event";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const whereClause = {
    ...(role !== "admin" && {
      OR: [
        { classId: null },
        // Teacher
        {
          class: {
            teacher: { id: userId! },
          },
        },
        // Student
        {
          class: {
            students: {
              some: {
                id: userId!,
              },
            },
          },
        },
        // Parent
        {
          class: {
            students: {
              some: {
                parent: { id: userId! },
              },
            },
          },
        },
      ],
    }),
  };

  const announcements = await prisma.announcement.findMany({
    where: whereClause,
    take: 3,
    orderBy: { date: "desc" },
  });

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((announce) => (
          <div
            key={announce.id}
            className="border border-l-4 odd:border-l-firstColor even:border-l-thirdColor rounded-md p-4"
          >
            <Event
              title={announce.title}
              description={announce.description || ""}
              date={announce.date || new Date()}
              type="announcement"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
