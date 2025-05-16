"use client";

import { role, teachersData } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { TeacherType } from "@/types";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import TableCard from "@/components/TableCard";
import { teacherColumns } from "@/data/columns";

const TeacherListPage = () => {
  function renderRow(item: TeacherType, index: number) {
    return (
      <TableRow key={item.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={item.photo}
                alt={item.name}
                className="object-cover"
              />
              <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item?.email}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">{item.teacherId}</TableCell>
        <TableCell className="hidden md:table-cell">
          {item.subjects.map((subject, index) => (
            <Badge key={index} variant="outline" className="mr-1">
              {subject}
            </Badge>
          ))}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {item.classes.map((cls, index) => (
            <Badge key={index} variant="secondary" className="mr-1">
              {cls}
            </Badge>
          ))}
        </TableCell>
        <TableCell className="hidden lg:table-cell">{item?.phone}</TableCell>
        <TableCell className="hidden lg:table-cell">{item?.address}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href={`/list/teachers/${item.id}`}
                aria-label="View details"
              >
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            {role === "admin" && (
              <FormModal table="teacher" type="delete" id={item.id} />
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableCard<TeacherType>
        renderRow={renderRow}
        data={teachersData}
        columns={teacherColumns}
        title="All Teachers"
        table="teacher"
      />
    </>
  );
};

export default TeacherListPage;
