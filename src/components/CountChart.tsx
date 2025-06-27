"use client";

import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import CustomTitle from "./CustomTitle";

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    {
      name: "Total",
      count: boys + girls,
      fill: "white",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#caf0f8",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#90e0ef",
    },
  ];

  return (
    <div className="bg-white rounded-lg w-full h-full p-4">
      {/* TITLE */}
      <CustomTitle name="Student" fontSize={0} marginY={0} />

      {/* CHART */}
      <div className="w-full h-[75%] relative">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-fourthColor" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-secondColor" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">
            Girls ({Math.round((girls / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
