import Image from "next/image";
import { smallCardData } from "@/data/userCardData";
import Link from "next/link";
import BigCalendar from "@/components/BigCalender";
import Announcements from "@/components/Announcements";
import Performance from "@/components/Performance";

import EmailIcon from "@mui/icons-material/Email";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PhoneIcon from "@mui/icons-material/Phone";

const SingleStudentPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-fourthColor py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                // src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                src="/avatar.png"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold capitalize">john doe</h1>
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <EmailIcon fontSize="small" />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <DateRangeIcon fontSize="small" />
                  <span>Jan 2024</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <PhoneIcon fontSize="small" />
                  <span>+123456789</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            {smallCardData.map((data) => {
              return (
                <div
                  key={data.id}
                  className="w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] bg-white"
                >
                  <Image
                    src={data.href}
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div className="">
                    <h1 className="text-xl font-semibold">{data.value}</h1>
                    <span className="text-sm text-gray-400">{data.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="p-4 rounded-md bg-white">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link href="/" className="p-3 rounded-md bg-secondColor">
              Student&apos;s Teachers
            </Link>
            <Link href="/" className="p-3 rounded-md bg-thirdColor">
              Student&apos;s Exams
            </Link>
            <Link href="/" className="p-3 rounded-md bg-fourthColor">
              Student&apos;s Assignments
            </Link>
            <Link href="/" className="p-3 rounded-md bg-secondColor">
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
