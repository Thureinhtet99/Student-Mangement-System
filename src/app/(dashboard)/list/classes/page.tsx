import { classColumns } from "@/data/columns";
import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";
import { ClassListType } from "@/types";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

const renderRow = async (item: ClassListType) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={item.id}>
      <TableCell>{item.name}</TableCell>  
      <TableCell className="hidden md:table-cell">
        {item.capacity || "-"}
      </TableCell>
      <TableCell>{item.teacher?.name || "-"}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {item.subjects.length > 2 ? (
          <>
            {item.subjects.slice(0, 2).map((subject) => (
              <React.Fragment key={subject.id}>
                <Badge
                  variant="secondary"
                  className="ml-2 mb-1 hover:bg-slate-200 cursor-pointer"
                >
                  {subject.name}
                </Badge>
              </React.Fragment>
            ))}
            <Badge
              variant="secondary"
              className="ml-2 mb-1 hover:bg-slate-200 cursor-pointer"
            >
              +{item.subjects.length - 2} more
            </Badge>
          </>
        ) : (
          <>
            {item.subjects.map((subject) => (
              <React.Fragment key={subject.id}>
                <Badge
                  variant="secondary"
                  className="ml-2 mb-1 hover:bg-slate-200 cursor-pointer"
                >
                  {subject.name}
                </Badge>
              </React.Fragment>
            ))}
          </>
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell text-xs">
        {item.students.length > 3 ? (
          <>
            {item.students
              .slice(0, 3)
              .map((student) => student.name)
              .join(", ")}
            <Badge
              variant="secondary"
              className="ml-2 mb-1 hover:bg-slate-200 cursor-pointer"
            >
              +{item.students.length - 3} more
            </Badge>
          </>
        ) : (
          item.students.map((student) => student.name).join(", ")
        )}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="class" type="update" data={item} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="class" type="delete" id={item.id} />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const ClassListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const whereClause = {
    AND: [
      {
        OR: [
          // Teacher
          {
            teacher: {
              id: userId!,
            },
          },
        ],
      },
      ...(queryParams.search
        ? [
            {
              OR: [
                {
                  name: {
                    contains: queryParams.search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },

                {
                  teacher: {
                    name: {
                      contains: queryParams.search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                },
              ],
            },
          ]
        : []),
    ],
  };
  const [classes, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: whereClause,
      include: {
        teacher: true,
        subjects: true,
        students: true,
        events: true,
        announcements: true,
        attendances: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.class.count({
      where: whereClause,
    }),
  ]);

  return (
    <>
      <TableCard<ClassListType>
        renderRow={renderRow}
        data={classes}
        columns={classColumns}
        page={p}
        count={count}
        title="All Classes"
        table="class"
        queryParams={queryParams}
        role={role}
      />
    </>
  );
};

export default ClassListPage;
