"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomTitle from "./CustomTitle";

const data = [
  {
    name: "Mon",
    present: 60,
    absent: 40,
  },
  {
    name: "Tue",
    present: 55,
    absent: 30,
  },
  {
    name: "Wed",
    present: 50,
    absent: 35,
  },
  {
    name: "Thu",
    present: 45,
    absent: 25,
  },
  {
    name: "Fri",
    present: 60,
    absent: 15,
  },
  {
    name: "Sat",
    present: 20,
    absent: 10,
  },
  {
    name: "Sun",
    present: 10,
    absent: 5,
  },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg w-full h-full p-4">
      {/* TITLE */}
      <CustomTitle name="Attendance" fontSize={0} marginY={0} />

      {/* CHART */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#48cae4" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#000" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderColor: "lightGray", borderRadius: "10px" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="present"
            fill="#ade8f4"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="absent"
            fill="#044bbd"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
