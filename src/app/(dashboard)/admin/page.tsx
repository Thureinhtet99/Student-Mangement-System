import EventCalendar from "@/components/EventCalendar";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import Announcements from "@/components/Announcements";
import prisma from "@/lib/prisma";

const AdminPage = async () => {
  const studentCounts = await prisma.student.groupBy({
    by: ["gender"],
    _count: true,
  });

  const boys =
    studentCounts.find((student) => student.gender === "MALE")?._count || 0;
  const girls =
    studentCounts.find((student) => student.gender === "FEMALE")?._count || 0;

  return (
    <>
      <div className="p-2 flex flex-col md:flex-row gap-4">
        {/* LEFT */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* USER CARDS */}
          <div className="flex flex-wrap gap-4 justify-between">
            <UserCard type="admin" year="2025/26" />
            <UserCard type="teacher" year="2025/26" />
            <UserCard type="student" year="2025/26" />
            <UserCard type="parent" year="2025/26" />
          </div>

          {/* MIDDLE CHART */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* COUNT CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountChart boys={boys} girls={girls} />
            </div>

            {/* ATTENDANCE CHART */}
            <div className="w-full lg:w-2/3 h-[450px]">
              <AttendanceChart />
            </div>
          </div>

          {/* BOTTOM CHART */}
          <div className="w-full h-[500px]">
            <FinanceChart />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <EventCalendar />
          <Announcements />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
