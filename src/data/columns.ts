export const teacherColumns = [
  { header: "Info", accessor: "info" },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden md:table-cell" },
  { header: "Address", accessor: "address", className: "hidden md:table-cell" },
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
  { header: "Subject Name", accessor: "subject name" },
  {
    header: "Teachers",
    accessor: "teachers",
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

export const lessonsColumns = [
  { header: "Lesson Name", accessor: "lesson name" },
  {
    header: "Class",
    accessor: "class",
    // className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

export const examsColumns = [
  { header: "Exam", accessor: "exam" },
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
    // className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

export const assignmentsColumns = [
  { header: "Assignment", accessor: "assignment" },
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
    // className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

export const resultsColumns = [
  { header: "Result", accessor: "result" },
  {
    header: "Student",
    accessor: "student",
    // className: "hidden md:table-cell",
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

export const eventsColumns = [
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

export const announcementsColumns = [
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
