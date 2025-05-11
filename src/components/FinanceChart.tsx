"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "March",
    income: 2000,
    expense: 9800,
  },
  {
    name: "April",
    income: 2000,
    expense: 9800,
  },
  {
    name: "May",
    income: 2000,
    expense: 9800,
  },
  {
    name: "June",
    income: 2000,
    expense: 9800,
  },
  {
    name: "July",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Aug",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Sep",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Oct",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Nov",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Dec",
    income: 2000,
    expense: 9800,
  },
];

import Image from "next/image";
import CustomTitle from "./CustomTitle";

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <CustomTitle name="Finance" fontSize={""} marginY={""} />
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#c3ebfa" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#044bbd" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#c3ebfa"
            strokeWidth={4}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#044bbd"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
