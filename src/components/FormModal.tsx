"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LoaderCircle, Pencil, Plus, Trash2, X } from "lucide-react";

// Loader
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});
const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});
const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});
const EventForm = dynamic(() => import("./forms/EventForm"), {
  loading: () => (
    <div className="flex justify-center items-center p-4">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});

// Forms
const forms: {
  [table: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  parent: (type, data) => <ParentForm type={type} data={data} />,
  announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
  assignment: (type, data) => <AssignmentForm type={type} data={data} />,
  attendance: (type, data) => <AttendanceForm type={type} data={data} />,
  class: (type, data) => <ClassForm type={type} data={data} />,
  event: (type, data) => <EventForm type={type} data={data} />,
  exam: (type, data) => <ExamForm type={type} data={data} />,
  lesson: (type, data) => <LessonForm type={type} data={data} />,
  result: (type, data) => <ResultForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "secondColor"
      : type === "update"
      ? "thirdColor"
      : "fourthColor";
  const icon =
    type === "create" ? (
      <Plus />
    ) : type === "update" ? (
      <Pencil size={16} />
    ) : (
      <Trash2  size={16}/>
    );

  // useState
  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="flex flex-col gap-4 p-4">
        <span className="text-center font-medium">
          Are you sure you want to delete this {table}?
        </span>
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded-md border-none w-max self-center"
        >
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full border-2 p-2${bgColor}`}
        onClick={() => setOpen(true)}
      >
        {icon}
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <X />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
