export const teacherColumns = [
  { header: "Info", accessor: "info" },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell px-2",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell px-2",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell px-2",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell px-2",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell px-2",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export const studentColumns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  { header: "Phone", accessor: "phone", className: "hidden md:table-cell" },
  { header: "Address", accessor: "address", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

export const parentColumns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student Name",
    accessor: "student name",
    className: "hidden md:table-cell",
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
  { header: "Actions", accessor: "action" },
];

export const subjectColumns = [
  {
    header: "Subject Name",
    accessor: "subject name",
    className: "hidden md:table-cell",
  },
  {
    header: "Teachers",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

export const classColumns = [
  { header: "Class Name", accessor: "class name" },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

export const lessonColumns = [
  { header: "Subject Name", accessor: "subject name" },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

export const examsColumns = [
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
    header: "Date",
    accessor: "date",
  },
  { header: "Actions", accessor: "action" },
];

export const assignmentColumns = [
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
    header: "Due date",
    accessor: "due-date",
  },
  { header: "Actions", accessor: "action" },
];

export const resultColumns = [
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
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
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
  { header: "Actions", accessor: "action" },
];

export const eventColumns = [
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
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

export const announcementColumns = [
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
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];
