"use client";

import EventCalendar from "@/components/EventCalendar";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import Announcements from "@/components/Announcements";

const AdminPage = () => {
  return (
    <>
      <div className="p-4 flex flex-col md:flex-row gap-4">
        
        {/* LEFT */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">

          {/* USER CARDS */}
          <div className="flex flex-wrap gap-4 justify-between">
            <UserCard type="Student" />
            <UserCard type="Teacher" />
            <UserCard type="Parent" />
            <UserCard type="Staff" />
          </div>

          {/* MIDDLE CHART */}
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* COUNT CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountChart />
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
