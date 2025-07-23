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
    header: "Gender",
    accessor: "gender",
    className: "hidden lg:table-cell",
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
  { header: "Info", accessor: "info" },
  { header: "ID", accessor: "id", className: "hidden lg:table-cell" },
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
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Lessons",
    accessor: "lesson",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const lessonColumns = [
  { header: "Name", accessor: "name" },
  { header: "Subject", accessor: "subject" },
  // {
  //   header: "Class",
  //   accessor: "class",
  //   className: "hidden md:table-cell",
  // },
  // {
  //   header: "Teacher",
  //   accessor: "teacher",
  //   className: "hidden lg:table-cell",
  // },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const attendanceColumns = [
  {
    header: "Student name",
    accessor: "name",
  },
  {
    header: "Present",
    accessor: "present",
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

export const assignmentColumns = [
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
    className: "hidden lg:table-cell",
  },
  {
    header: "Description",
    accessor: "description",
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

// export const resultColumns = [
//   { header: "Student", accessor: "student" },
//   { header: "Exam/Assignment name", accessor: "eaname" },
//   { header: "Type", accessor: "type" },
//   { header: "Score", accessor: "score" },
//   { header: "Class", accessor: "className", className: "hidden md:table-cell" },
//   { header: "Date", accessor: "startTime", className: "hidden md:table-cell" },
//   {
//     header: "Actions",
//     accessor: "action",
//     className: "flex justify-end items-center",
//   },
// ];

// Update columns to remove type column since we're separating by tabs
export const examResultColumns = [
  { header: "Student", accessor: "student" },
  { header: "Score", accessor: "score" },
  { header: "Exam", accessor: "exam", className: "hidden md:table-cell" },
  { header: "Comment", accessor: "comment", className: "hidden lg:table-cell" },
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

export const assignmentResultColumns = [
  { header: "Student", accessor: "student" },
  { header: "Score", accessor: "score" },
  { header: "Assignment", accessor: "assignment" },
  { header: "Comment", accessor: "comment", className: "hidden lg:table-cell" },
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
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell",
  },
  {
    header: "Start Time",
    accessor: "start Time",
    className: "hidden md:table-cell",
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
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell",
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
