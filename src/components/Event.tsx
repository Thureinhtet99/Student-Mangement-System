"use client";

const Event = ({ title, time, description, type }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{title}</h1>
        <span
          className={`text-xs text-gray-400 ${
            type === "announcement" ? "bg-white rounded-md p-1" : ""
          }`}
        >
          {time}
        </span>
      </div>
      <p
        className={`${
          type === "announcement" ? "mt-1" : "mt-4"
        } text-gray-500 text-sm`}
      >
        {description}
      </p>
    </>
  );
};

export default Event;
