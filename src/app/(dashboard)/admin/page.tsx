import EventCalendar from "@/components/EventCalendar";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import Announcements from "@/components/Announcements";
import prisma from "@/libs/prisma";

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT SECTION */}
          <div className="xl:col-span-2 space-y-6">
            {/* USER CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <UserCard type="admin" year="2025/26" />
              <UserCard type="teacher" year="2025/26" />
              <UserCard type="student" year="2025/26" />
              <UserCard type="parent" year="2025/26" />
            </div>

            {/* CHARTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* COUNT CHART */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-[450px]">
                  <CountChart boys={boys} girls={girls} />
                </div>
              </div>

              {/* ATTENDANCE CHART */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-[450px]">
                  <AttendanceChart />
                </div>
              </div>
            </div>

            {/* FINANCE CHART */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-[500px]">
              <FinanceChart />
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <EventCalendar />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <Announcements />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
