"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LoaderCircle, Pencil, Plus, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const icon =
    type === "create" ? (
      <Plus />
    ) : type === "update" ? (
      <Pencil size={16} />
    ) : (
      <Trash2 size={16} />
    );

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="flex flex-col gap-4 p-4">
        <span className="text-center font-medium">
          Are you sure you want to delete this {table}?
        </span>
        <Button variant="destructive" type="submit" className="self-center">
          Delete
        </Button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found"
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`${size} flex items-center justify-center rounded-full`}
        >
          {icon}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create"
              ? `Create ${table}`
              : type === "update"
              ? `Update ${table}`
              : `Delete ${table}`}
          </DialogTitle>
        </DialogHeader>
        <Form />
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
