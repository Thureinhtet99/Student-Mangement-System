"use client";

import Link from "next/link";
import { studentColumns } from "@/data/columns";
import { role, studentsData } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { Eye } from "lucide-react";
import { StudentType } from "@/types";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableCard from "@/components/TableCard";

const StudentListPage = () => {
  function renderRow(item: StudentType, index: number) {
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
        <TableCell className="hidden md:table-cell">{item.studentId}</TableCell>
        <TableCell className="hidden lg:table-cell">{item.grade}</TableCell>
        <TableCell className="hidden lg:table-cell">{item?.phone}</TableCell>
        <TableCell className="hidden lg:table-cell">{item?.address}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href={`/list/students/${item.id}`}
                aria-label="View details"
              >
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            {role === "admin" && (
              <FormModal table="student" type="delete" id={item.id} />
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableCard<StudentType>
        renderRow={renderRow}
        data={studentsData}
        columns={studentColumns}
        title="All Students"
        table="student"
      />
    </>
  );
};

export default StudentListPage;
