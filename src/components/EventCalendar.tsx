"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Event from "./Event";
import CustomTitle from "./CustomTitle";

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

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <CustomTitle name="Events" fontSize="xl" marginY="my-4" />
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-firstColor even:border-t-thirdColor"
          >
            <Event
              title={event.title}
              time={event.time}
              description={event.description}
              type="Events"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
