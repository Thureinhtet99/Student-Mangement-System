"use client";

import Announcements from "@/components/Announcements";
import BigCalender from "@/components/BigCalender";

const ParentPage = () => {
  return (
    <div className="p-4 flex flex-col flex-1 md:flex-row xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-8">
        <div className="h-full rounded-md p-4 bg-white">
          <h1 className="text-xl font-semibold">Schedule ( John Doe )</h1>
          <BigCalender />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
