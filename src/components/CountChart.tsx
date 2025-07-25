"use client";

import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Users2 } from "lucide-react";

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
      fill: "#025699",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#219dd7",
    },
  ];

  return (
    <div className="bg-white rounded-lg w-full h-full p-4">
      {/* TITLE */}
      <h1 className="font-semibold">Students</h1>

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
        <Users2
          size={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* BOTTOM */}
      <div className="flex items-center justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-firstColor" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-secondColor" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs">
            Girls ({Math.round((girls / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
