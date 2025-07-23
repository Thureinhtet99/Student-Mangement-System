"use client";

import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import CustomTitle from "./CustomTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface TeacherPerformanceProps {
  teacherId: string;
  subjects: { id: number; name: string }[];
  classes: { id: number; name: string }[];
}

interface PerformanceData {
  totalStudents: number;
  totalSubjects: number;
  totalClasses: number;
  averageScore: number;
  attendanceRate: number;
  passRate: number;
  overallRating: number;
}

const TeacherPerformance = ({
  teacherId,
  subjects,
  classes,
}: TeacherPerformanceProps) => {
  const [performanceData, setPerformanceData] =
    useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch(`/api/teachers/${teacherId}/performance`);
        if (response.ok) {
          const data = await response.json();
          setPerformanceData(data.performance);
        }
      } catch (error) {
        console.error("Failed to fetch performance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [teacherId]);

  // Default/fallback data
  const defaultData: PerformanceData = {
    totalStudents: 0,
    totalSubjects: subjects.length,
    totalClasses: classes.length,
    averageScore: 85,
    attendanceRate: 88,
    passRate: 92,
    overallRating: 8.5,
  };

  const data = performanceData || defaultData;

  // Chart data based on performance
  const chartData = [
    {
      name: "Excellent",
      value: Math.max(0, data.passRate - 10),
      fill: "#22c55e",
    },
    { name: "Good", value: Math.min(25, 100 - data.passRate), fill: "#3b82f6" },
    {
      name: "Needs Improvement",
      value: Math.max(5, 100 - data.passRate),
      fill: "#f59e0b",
    },
  ];

  const performanceMetrics = [
    {
      label: "Student Success Rate",
      value: `${data.passRate}%`,
      description: "Students passing in your subjects",
      color: "bg-green-100 text-green-800",
    },
    {
      label: "Class Attendance",
      value: `${data.attendanceRate}%`,
      description: "Average attendance in your classes",
      color: "bg-blue-100 text-blue-800",
    },
    {
      label: "Subjects Taught",
      value: data.totalSubjects.toString(),
      description: "Active teaching subjects",
      color: "bg-purple-100 text-purple-800",
    },
    {
      label: "Classes Managed",
      value: data.totalClasses.toString(),
      description: "Classes under your guidance",
      color: "bg-orange-100 text-orange-800",
    },
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">
                Loading performance data...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <CustomTitle name="Teaching Performance" />

          {/* Performance Chart */}
          <div className="relative h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {data.overallRating}
              </h1>
              <p className="text-xs text-gray-500">Overall Rating</p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-medium text-sm text-gray-600">
              Current Academic Year Performance
            </h3>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-3">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">
                    {metric.label}
                  </span>
                  <Badge className={`text-xs px-2 py-1 ${metric.color}`}>
                    {metric.value}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 text-xs">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherPerformance;
