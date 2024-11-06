"use client";

import Event from "./Event";

// TEMPORARY
const events = [
  {
    id: 1,
    title: "lorem",
    time: "12:00 PM - 2:00 PM",
    description: "loremmmmmmmmm",
  },
  {
    id: 2,
    title: "lorem",
    time: "12:00 PM - 2:00 PM",
    description: "loremmmmmmmmm",
  },
  {
    id: 3,
    title: "lorem",
    time: "12:00 PM - 2:00 PM",
    description: "loremmmmmmmmm",
  },
];

const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="odd:bg-thirdColor even:bg-fourthColor rounded-md p-4"
          >
            <Event
              title={event.title}
              time={event.time}
              description={event.description}
              type="announcement"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
