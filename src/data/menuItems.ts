import { ROUTE_CONFIG } from "@/configs/appConfig";

export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: `${ROUTE_CONFIG.HOME}`,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: `${ROUTE_CONFIG.TEACHER_LIST}`,
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: `${ROUTE_CONFIG.STUDENT_LIST}`,
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: `${ROUTE_CONFIG.PARENT_LIST}`,
        visible: ["admin", "teacher"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: `${ROUTE_CONFIG.CLASS_LIST}`,
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: `${ROUTE_CONFIG.SUBJECT_LIST}`,
        visible: ["admin"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: `${ROUTE_CONFIG.LESSON_LIST}`,
        visible: ["admin", "teacher"],
      },
      {
        icon: "/attendance.png",
        label: "Attendances",
        href: `${ROUTE_CONFIG.ATTENDANCE_LIST}`,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: `${ROUTE_CONFIG.ASSIGNMENT_LIST}`,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: `${ROUTE_CONFIG.EXAM_LIST}`,
        visible: ["admin", "teacher", "student", "parent"],
      },

      {
        icon: "/result.png",
        label: "Results",
        href: `${ROUTE_CONFIG.RESULT_LIST}`,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: `${ROUTE_CONFIG.EVENT_LIST}`,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: `${ROUTE_CONFIG.ANNOUNCEMENT_LIST}`,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: `${ROUTE_CONFIG.MESSAGE_LIST}`,
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },

  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: `${ROUTE_CONFIG.PROFILE}`,
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: `${ROUTE_CONFIG.SETTINGS}`,
        visible: ["admin", "teacher", "student", "parent"],
      },
      // {
      //   icon: "/logout.png",
      //   label: "Logout",
      //   href: "/logout",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
    ],
  },
];
