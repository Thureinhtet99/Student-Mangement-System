export const teacherColumns = [
  { header: "Info", accessor: "info" },
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },

  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const studentColumns = [
  { header: "Info", accessor: "info" },
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Birthday",
    accessor: "birthday",
    className: "hidden lg:table-cell",
  },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const parentColumns = [
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
  { header: "Info", accessor: "info" },
  { header: "ID", accessor: "id", className: "hidden md:table-cell" },
  {
    header: "Students",
    accessor: "students",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const subjectColumns = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Lessons",
    accessor: "lesson",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const classColumns = [
  { header: "Name", accessor: "name" },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
  },
  {
    header: "Subjects",
    accessor: "subject",
    className: "hidden lg:table-cell",
  },
  {
    header: "Students",
    accessor: "student",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const lessonColumns = [
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
  { header: "Name", accessor: "name" },
  { header: "Subject", accessor: "subject" },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const examColumns = [
  { header: "Name", accessor: "name" },
  {
    header: "Subject",
    accessor: "subject",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden lg:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Time",
    accessor: "time",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const assignmentColumns = [
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
  { header: "Name", accessor: "name" },
  {
    header: "Subject",
    accessor: "subject",
    className: "hidden md:table-cell",
  },
  {
    header: "Due date",
    accessor: "due-date",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden lg:table-cell",
  },

  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const resultColumns = [
  { header: "Title", accessor: "title" },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden lg:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const eventColumns = [
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Start Time",
    accessor: "start Time",
  },
  {
    header: "End time",
    accessor: "end time",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const announcementColumns = [
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];
