"use client";

import Image from "next/image";
import { teacherCardData } from "@/data/cardData";
import Link from "next/link";
import BigCalendar from "@/components/BigCalender";
import Announcements from "@/components/Announcements";
import Performance from "@/components/Performance";
import FormModal from "@/components/FormModal";
import { Calendar1, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleTeacherPage = () => {
  // const {id} = useParams();
  // console.log(typeof id);

  // Use client-side only rendering for random values
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Pre-calculate student grades to avoid hydration mismatch
  const studentGrades = Array.from(
    { length: 8 },
    () => Math.floor(Math.random() * 12) + 1
  );
  // Pre-calculate time periods
  const classTimes = Array.from({ length: 6 }, () => ({
    hour: Math.floor(Math.random() * 12) + 1,
    period: Math.random() > 0.5 ? "AM" : "PM",
  }));

  return (
    <div className="flex-1 flex flex-col gap-4 xl:flex-row p-2">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <Card className="flex-1">
            <CardContent className="py-6 flex gap-4">
              <div className="flex justify-center items-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Leonard Snyder"
                    className="object-cover"
                  />
                  <AvatarFallback>LS</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col justify-between gap-4 flex-1">
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
                    // id={id}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Mail size={18} />
                    <span>user@gmail.com</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Calendar1 size={18} />
                    <span>Jan 2024</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Phone size={18} />
                    <span>+123456789</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            {teacherCardData.map((data) => (
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

        {/* SCHEDULE */}
        <Card>
          <CardHeader>
            <CardTitle>Teacher&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent className="h-[750px]">
            <BigCalendar />
          </CardContent>
        </Card>

        {/* STUDENTS - Moved from right side */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* TEACHER'S STUDENTS */}
          <Card className="w-full lg:w-1/2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Teacher&apos;s Students</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-64 overflow-y-auto pr-1">
                {/* Only render with random values on the client */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <Link
                    href={`/list/students/${i + 1}`}
                    key={i}
                    className="flex items-center gap-3 p-3 hover:bg-muted/50 border-b last:border-b-0 group"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`https://i.pravatar.cc/150?img=${i + 10}`}
                        alt={`Student ${i + 1}`}
                      />
                      <AvatarFallback>{`S${i + 1}`}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        Student Name {i + 1}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Grade {isClient ? studentGrades[i] : ""}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add action for the button click
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* TEACHER'S SUBJECTS */}
          <Card className="w-full lg:w-1/2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Teacher&apos;s Subjects</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-64 overflow-y-auto pr-1">
                {/* Sample lesson data - replace with your actual data */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <Link
                    href={`/list/lessons/${i + 1}`}
                    key={i}
                    className="flex items-center gap-3 p-3 hover:bg-muted/50 border-b last:border-b-0 group"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {
                          [
                            "Mathematics",
                            "Science",
                            "English",
                            "History",
                            "Art",
                            "Physical Education",
                          ][i]
                        }
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {
                          [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                          ][i % 5]
                        }{" "}
                        •{" "}
                        {isClient
                          ? `${classTimes[i].hour}:00 ${classTimes[i].period}`
                          : ""}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add action for the button click
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        
        {/* TEACHER'S CLASSES */}
          <Card className="w-full lg:w-1/2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Teacher&apos;s Classes</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-64 overflow-y-auto pr-1">
                {/* Sample lesson data - replace with your actual data */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <Link
                    href={`/list/lessons/${i + 1}`}
                    key={i}
                    className="flex items-center gap-3 p-3 hover:bg-muted/50 border-b last:border-b-0 group"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {
                          [
                            "Mathematics",
                            "Science",
                            "English",
                            "History",
                            "Art",
                            "Physical Education",
                          ][i]
                        }
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {
                          [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                          ][i % 5]
                        }{" "}
                        •{" "}
                        {isClient
                          ? `${classTimes[i].hour}:00 ${classTimes[i].period}`
                          : ""}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add action for the button click
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
