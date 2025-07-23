import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Event from "./Event";
import prisma from "@/libs/prisma";
import { auth } from "@clerk/nextjs/server";

const EventCalendar = async () => {
  // const [value, onChange] = useState<Value>(new Date());

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const whereClause =
    role !== "admin"
      ? {
          AND: [
            {
              OR: [
                // Teacher
                {
                  class: {
                    teacherId: userId as string,
                  },
                },
                // Student
                {
                  class: {
                    students: {
                      some: { id: userId as string },
                    },
                  },
                },
                // Parent
                {
                  class: {
                    students: {
                      some: { parentId: userId as string },
                    },
                  },
                },
              ],
            },
          ].filter((condition) => Object.keys(condition).length > 0),
        }
      : undefined;

  const events = await prisma.event.findMany({
    where: whereClause,
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="h-full">
      <Calendar />
      <div className="flex justify-between items-center my-6">
        <h1 className="text-lg font-semibold text-gray-800">Events</h1>
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((announce) => (
            <div
              key={announce.id}
              className="border-l-4 border-l-gray-300 bg-gray-50 rounded-r-lg p-2 hover:bg-gray-100 transition-colors"
            >
              <Event
                title={announce.name}
                description={announce.description || ""}
                date={announce.startTime || new Date()}
                type="event"
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No events available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
