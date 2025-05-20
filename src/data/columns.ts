export const teacherColumns = [
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
  { header: "Info", accessor: "info" },
  {
    header: "Teacher ID",
    accessor: "teacherId",
  },
  {
    header: "Subjects",
    accessor: "subjects",
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
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
  { header: "Info", accessor: "info" },
  {
    header: "Student ID",
    accessor: "studentId",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  {
    header: "Birthday",
    accessor: "birthday",
    className: "hidden md:table-cell",
  },
  {
    header: "Blood Type",
    accessor: "bloodtype",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const parentColumns = [
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
  { header: "Info", accessor: "info" },
  {
    header: "Student Name",
    accessor: "student name",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const subjectColumns = [
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
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
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
  { header: "Name", accessor: "name" },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden lg:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
  },
  {
    header: "Lessons",
    accessor: "lesson",
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
  { header: "Subject Name", accessor: "subject name" },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const examColumns = [
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
  { header: "Name", accessor: "name" },
  {
    header: "Subject Name",
    accessor: "subject name",
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
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const assignmentColumns = [
  { header: "#", accessor: "index", className: "hidden md:table-cell" },
  { header: "Name", accessor: "name" },
  {
    header: "Subject Name",
    accessor: "subject name",
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
    header: "Due date",
    accessor: "due-date",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex justify-end items-center",
  },
];

export const resultColumns = [
  { header: "#", accessor: "index" },
  { header: "Subject Name", accessor: "subject name" },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  // {
  //   header: "Teacher",
  //   accessor: "teacher",
  //   className: "hidden md:table-cell",
  // },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
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
    header: "Date",
    accessor: "date",
  },
  {
    header: "Start Time",
    accessor: "start Time",
    className: "hidden lg:table-cell",
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
