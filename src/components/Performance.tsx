"use client";

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Calendar,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PerformanceType } from "@/types";

const Performance = ({ results }: PerformanceType) => {
  // Calculate comprehensive performance metrics
  const calculatePerformance = () => {
    if (!results || results.length === 0) {
      return {
        averageScore: 0,
        performanceGrade: 0,
        trend: null,
        data: [{ name: "No Data", value: 100, fill: "#e5e7eb" }],
        progressData: [],
        highestScore: 0,
        lowestScore: 0,
        improvement: 0,
        consistency: 0,
      };
    }

    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const averageScore = totalScore / results.length;
    const performanceGrade = Math.round(averageScore) / 10; // Convert to 0-10 scale

    // Calculate performance categories
    const excellent = results.filter((r) => r.score >= 90).length;
    const good = results.filter((r) => r.score >= 70 && r.score < 90).length;
    const needsImprovement = results.filter((r) => r.score < 70).length;

    const data = [
      { name: "Excellent (90-100)", value: excellent, fill: "#22c55e" },
      { name: "Good (70-89)", value: good, fill: "#3b82f6" },
      {
        name: "Needs Improvement (<70)",
        value: needsImprovement,
        fill: "#ef4444",
      },
    ].filter((item) => item.value > 0);

    // Calculate trend and additional metrics
    const scores = results.map((r) => r.score);
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    // Calculate improvement (comparison between first half and second half)
    const midPoint = Math.floor(results.length / 2);
    const firstHalf = results.slice(0, midPoint);
    const secondHalf = results.slice(midPoint);

    const firstHalfAvg =
      firstHalf.reduce((sum, r) => sum + r.score, 0) / firstHalf.length;
    const secondHalfAvg =
      secondHalf.reduce((sum, r) => sum + r.score, 0) / secondHalf.length;
    const improvement = secondHalfAvg - firstHalfAvg;

    // Calculate consistency (standard deviation)
    const variance =
      scores.reduce(
        (sum, score) => sum + Math.pow(score - averageScore, 2),
        0
      ) / scores.length;
    const standardDeviation = Math.sqrt(variance);
    const consistency = Math.max(
      0,
      100 - (standardDeviation / averageScore) * 100
    );

    // Progress data for trend visualization
    const progressData = results.map((result, index) => ({
      test: `T${index + 1}`,
      score: result.score,
      name: result.exam?.name || result.assignment?.name || `Test ${index + 1}`,
    }));

    // Determine trend
    let trend = null;
    if (results.length >= 2) {
      const recentScores = results.slice(-3);
      const earlierScores = results.slice(0, -3);
      if (recentScores.length > 0 && earlierScores.length > 0) {
        const recentAvg =
          recentScores.reduce((sum, r) => sum + r.score, 0) /
          recentScores.length;
        const earlierAvg =
          earlierScores.reduce((sum, r) => sum + r.score, 0) /
          earlierScores.length;
        trend =
          recentAvg > earlierAvg
            ? "improving"
            : recentAvg < earlierAvg
            ? "declining"
            : "stable";
      }
    }

    return {
      averageScore: Math.round(averageScore),
      performanceGrade: performanceGrade.toFixed(1),
      trend,
      data:
        data.length > 0
          ? data
          : [{ name: "No Data", value: 100, fill: "#e5e7eb" }],
      progressData,
      highestScore,
      lowestScore,
      improvement: Math.round(improvement),
      consistency: Math.round(consistency),
    };
  };

  const {
    averageScore,
    performanceGrade,
    trend,
    data,
    progressData,
    highestScore,
    lowestScore,
    improvement,
    consistency,
  } = calculatePerformance();

  const getTrendIcon = () => {
    if (trend === "improving")
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === "declining")
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <BarChart3 className="h-4 w-4 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (trend === "improving") return "text-green-500";
    if (trend === "declining") return "text-red-500";
    return "text-gray-500";
  };

  const getPerformanceLevel = () => {
    if (averageScore >= 90)
      return { level: "Excellent", color: "bg-green-500" };
    if (averageScore >= 80) return { level: "Very Good", color: "bg-blue-500" };
    if (averageScore >= 70) return { level: "Good", color: "bg-yellow-500" };
    if (averageScore >= 60)
      return { level: "Satisfactory", color: "bg-orange-500" };
    return { level: "Needs Improvement", color: "bg-red-500" };
  };

  if (!results || results.length === 0) {
    return (
      <div className="w-full">
        <div className="text-center py-8 text-muted-foreground">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">No performance data available</p>
          <p className="text-xs">
            Results will appear here once exams or assignments are completed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Performance Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center mb-1">
            <Award className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-xs font-medium">Average Score</span>
          </div>
          <div className="text-2xl font-bold text-primary">{averageScore}</div>
          <div className="text-xs text-muted-foreground">out of 100</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center mb-1">
            <Target className="h-4 w-4 text-blue-500 mr-1" />
            <span className="text-xs font-medium">GPA</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            {performanceGrade}
          </div>
          <div className="text-xs text-muted-foreground">out of 10</div>
        </div>
      </div>

      {/* Performance Level Badge */}
      <div className="text-center">
        <Badge
          className={`${getPerformanceLevel().color} text-white px-3 py-1`}
        >
          {getPerformanceLevel().level}
        </Badge>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Highest Score:</span>
            <span className="font-semibold text-green-600">{highestScore}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Lowest Score:</span>
            <span className="font-semibold text-red-600">{lowestScore}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Improvement:</span>
            <span
              className={`font-semibold ${
                improvement >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {improvement >= 0 ? "+" : ""}
              {improvement}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Consistency:</span>
            <span className="font-semibold text-blue-600">{consistency}%</span>
          </div>
        </div>
      </div>

      {/* Trend Analysis */}
      {trend && (
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Performance Trend</span>
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {trend === "improving"
                  ? "Improving"
                  : trend === "declining"
                  ? "Declining"
                  : "Stable"}
              </span>
            </div>
          </div>
          {improvement !== 0 && (
            <p className="text-xs text-muted-foreground">
              {improvement > 0
                ? `Performance has improved by ${improvement} points on average`
                : `Performance has declined by ${Math.abs(
                    improvement
                  )} points on average`}
            </p>
          )}
        </div>
      )}

      {/* Progress Chart */}
      {progressData.length > 1 && (
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Score Progress
          </h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="test"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: any) => [`${value}%`, "Score"]}
                  labelFormatter={(label) => {
                    const item = progressData.find((d) => d.test === label);
                    return item?.name || label;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Performance Distribution */}
      <div>
        <h4 className="text-sm font-medium mb-3">Performance Distribution</h4>
        <div className="relative h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution Legend */}
        <div className="mt-3 space-y-2">
          {data.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="text-muted-foreground text-xs">
                  {entry.name}
                </span>
              </div>
              <span className="font-medium">
                {entry.value} result{entry.value !== 1 ? "s" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3">
        <h4 className="text-sm font-medium mb-2 text-blue-800 dark:text-blue-200">
          Performance Insights
        </h4>
        <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          {averageScore >= 90 && (
            <p>• Excellent performance! Keep up the outstanding work.</p>
          )}
          {averageScore >= 80 && averageScore < 90 && (
            <p>• Very good performance with room for excellence.</p>
          )}
          {averageScore >= 70 && averageScore < 80 && (
            <p>• Good performance. Consider focusing on challenging topics.</p>
          )}
          {averageScore < 70 && (
            <p>• Additional support and practice may be beneficial.</p>
          )}
          {consistency > 80 && (
            <p>• Very consistent performance across assessments.</p>
          )}
          {consistency < 60 && (
            <p>
              • Performance varies significantly - consider study habit
              consistency.
            </p>
          )}
          {trend === "improving" && (
            <p>• Showing positive improvement trend - great progress!</p>
          )}
          {trend === "declining" && (
            <p>• Recent decline noted - may need additional support.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Performance;
