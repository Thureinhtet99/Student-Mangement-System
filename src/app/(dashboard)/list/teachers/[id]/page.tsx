"use client";

import Image from "next/image";
import { smallCardData } from "@/data/userCardData";
import Link from "next/link";
import BigCalendar from "@/components/BigCalender";
import Announcements from "@/components/Announcements";
import Performance from "@/components/Performance";
import FormModal from "@/components/FormModal";
import { Calendar1, Mail, Phone } from "lucide-react";

const SingleTeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-fourthColor py-6 px-2 rounded-md flex-1 flex gap-4">
            <div className="w-1/3 flex justify-center items-center">
              <Image
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                // src="/avatar.png"
                alt=""
                width={132}
                height={132}
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl font-semibold capitalize">
                  leonard snyder
                </h1>
                <FormModal
                  table="teacher"
                  type="update"
                  data={{
                    id: 1,
                    username: "deanguerrero",
                    email: "deanguerrero@gmail.com",
                    password: "password",
                    firstName: "Dean",
                    lastName: "Guerrero",
                    phone: "+1 234 567 89",
                    address: "1234 Main St, Anytown, USA",
                    bloodType: "A+",
                    dateOfBirth: "2000-01-01",
                    sex: "male",
                    img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                  }}
                />
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Mail fontSize="small" />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Calendar1 fontSize="small" />
                  <span>Jan 2024</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Phone fontSize="small" />
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
                  className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]"
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
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="p-4 rounded-md bg-white">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link href="/" className="p-3 rounded-md bg-secondColor">
              Teacher&apos;s Students
            </Link>
            <Link href="/" className="p-3 rounded-md bg-thirdColor">
              Teacher&apos;s Lessons
            </Link>
            <Link href="/" className="p-3 rounded-md bg-fourthColor">
              Teacher&apos;s Exams
            </Link>
            <Link href="/" className="p-3 rounded-md bg-secondColor">
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
