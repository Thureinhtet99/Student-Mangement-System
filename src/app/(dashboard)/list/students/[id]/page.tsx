"use client";

import Image from "next/image";
import { studentCardData } from "@/data/cardData";
import Link from "next/link";
import BigCalendar from "@/components/BigCalender";
import Announcements from "@/components/Announcements";
import Performance from "@/components/Performance";
import FormModal from "@/components/FormModal";
import { Calendar1, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SingleStudentPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <Card className="flex-1">
            <CardContent className="py-6 flex gap-4">
              <div className="flex justify-center items-center">
                <Avatar className="w-28 h-28">
                  <AvatarImage
                    src="https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Leonard Snyder"
                    className="object-cover"
                  />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col justify-between gap-4 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="text-xl font-semibold capitalize">
                    cameron moran
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
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>user@gmail.com</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Calendar1 className="h-4 w-4" />
                    <span>Jan 2024</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+123456789</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            {studentCardData.map((data) => (
              <Card
                key={data.id}
                className="w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]"
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <Image
                    src={data.href}
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div>
                    <p className="text-xl font-semibold">{data.value}</p>
                    <p className="text-sm text-muted-foreground">{data.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Teacher&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent className="h-[750px]">
            <BigCalendar />
          </CardContent>
        </Card>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Student Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Attendance Section */}
              <div>
                <h3 className="font-medium mb-2 flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar1 className="h-4 w-4 mr-1" /> Attendances
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date().toLocaleString("default", { month: "long" })}
                  </span>
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="flex flex-col items-center p-3 rounded-md bg-green-50 border border-green-100">
                    <span className="text-green-600 font-medium text-xl">
                      18
                    </span>
                    <span className="text-xs text-green-800">Present</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-md bg-red-50 border border-red-100">
                    <span className="text-red-600 font-medium text-xl">2</span>
                    <span className="text-xs text-red-800">Absent</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>90% attendance rate</span>
                  <span>20 school days</span>
                </div>
              </div>

              <Separator />

              {/* Assignments Section */}
              {/* <div>
                <h3 className="font-medium mb-2">Assignments</h3>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Math Homework</span>
                    <Badge variant="secondary">Due in 2 days</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Science Project</span>
                    <Badge variant="destructive">Overdue</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>English Essay</span>
                    <Badge>Completed</Badge>
                  </div>
                </div>
                <Button variant="outline" asChild size="sm" className="w-full">
                  <Link href="/assignments/student-id">
                    View All Assignments
                  </Link>
                </Button>
              </div> */}

              {/* <Separator /> */}

              {/* Student Information Section */}
              <div>
                <h3 className="font-medium mb-2">Student Information</h3>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Parent</span>
                    <span className="font-medium">John & Mary Moran</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Class</span>
                    <Badge variant="outline">Class 10-A</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Grade</span>
                    <Badge variant="outline">10th Grade</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Results Section */}
              <div>
                <h3 className="font-medium mb-2">Recent Results</h3>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Math Midterm</span>
                    <Badge variant={85 >= 70 ? "default" : "destructive"}>
                      85/100
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Science Project</span>
                    <Badge variant={92 >= 70 ? "default" : "destructive"}>
                      92/100
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">English Essay</span>
                    <Badge variant={78 >= 70 ? "default" : "destructive"}>
                      78/100
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1 text-center">
                  85/100 Average Score
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
