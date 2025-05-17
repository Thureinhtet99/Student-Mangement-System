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
            <CardTitle>Shortcuts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Button variant="secondary" asChild size="sm">
                <Link href="/">Teacher&apos;s Students</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link href="/">Teacher&apos;s Lessons</Link>
              </Button>
              <Button variant="secondary" asChild size="sm">
                <Link href="/">Teacher&apos;s Exams</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link href="/">Teacher&apos;s Assignments</Link>
              </Button>
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
