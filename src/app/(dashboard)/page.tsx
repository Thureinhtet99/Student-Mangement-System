"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  UsersIcon,
  BookOpenIcon,
  BarChart3Icon,
} from "lucide-react";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <main className="container mx-auto p-4 flex-1">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <CalendarIcon className="h-4 w-4" />
                Today
              </Button>
              <Button variant="default" size="sm">
                Add Student
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Courses
                </CardTitle>
                <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  +2 new this semester
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average GPA
                </CardTitle>
                <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.45</div>
                <p className="text-xs text-muted-foreground">
                  +0.2 from last semester
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Attendance Rate
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.4%</div>
                <p className="text-xs text-muted-foreground">
                  -1.2% from last week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different views */}
          <Tabs
            defaultValue="overview"
            className="mt-4"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                  <CardDescription>
                    Quick overview of the student management system
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md">
                          Recent Enrollments
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {[
                            "Alex Johnson - Computer Science",
                            "Maria Garcia - Biology",
                            "James Williams - Physics",
                            "Emily Brown - Mathematics",
                          ].map((student, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between py-2 border-b"
                            >
                              <span>{student}</span>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          View All Enrollments
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md">
                          Academic Calendar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {[
                            { date: "May 30", event: "Final Exams Begin" },
                            { date: "Jun 15", event: "Summer Break Starts" },
                            { date: "Aug 20", event: "Faculty Meeting" },
                            { date: "Sep 5", event: "Fall Semester Begins" },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between py-2 border-b"
                            >
                              <div>
                                <p className="font-medium">{item.event}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.date}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm">
                                <CalendarIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          View Full Calendar
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recent">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest actions and updates in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        time: "2 hours ago",
                        action: "New student registered: Marcus Lee",
                        type: "Registration",
                      },
                      {
                        time: "5 hours ago",
                        action:
                          "Grade updated for CSC101: Introduction to Programming",
                        type: "Grades",
                      },
                      {
                        time: "Yesterday",
                        action: "Attendance marked for MTH201: Calculus II",
                        type: "Attendance",
                      },
                      {
                        time: "Yesterday",
                        action: "New course added: PHY302 - Quantum Mechanics",
                        type: "Course",
                      },
                      {
                        time: "2 days ago",
                        action: "Student profile updated: Sarah Johnson",
                        type: "Profile",
                      },
                    ].map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-start space-x-4 rounded-md border p-4"
                      >
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">
                            {activity.action}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{activity.time}</span>
                            <span className="mx-2">•</span>
                            <span>{activity.type}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>
                    Schedule and deadlines for the next two weeks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        date: "May 26, 2025",
                        event: "Registration Deadline for Summer Courses",
                        type: "Deadline",
                      },
                      {
                        date: "May 28, 2025",
                        event: "Faculty Meeting - Annual Review",
                        type: "Meeting",
                      },
                      {
                        date: "May 30, 2025",
                        event: "End of Spring Semester",
                        type: "Academic",
                      },
                      {
                        date: "June 2, 2025",
                        event: "Grade Submission Deadline",
                        type: "Deadline",
                      },
                      {
                        date: "June 10, 2025",
                        event: "Summer Orientation for New Students",
                        type: "Event",
                      },
                    ].map((event, i) => (
                      <div
                        key={i}
                        className="flex items-start space-x-4 rounded-md border p-4"
                      >
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{event.event}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{event.date}</span>
                            <span className="mx-2">•</span>
                            <span>{event.type}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Full Calendar
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default Homepage;
