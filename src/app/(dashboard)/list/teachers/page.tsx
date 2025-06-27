import FormContainer from "@/components/FormContainer";
import { TeacherListType } from "@/types";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import TableCard from "@/components/TableCard";
import { teacherColumns } from "@/data/columns";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

const renderRow = async (item: TeacherListType) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={item.id}>
      <TableCell className="py-0">
        <div className="flex items-center gap-x-3">
          <Avatar>
            <AvatarImage
              src={item?.image || undefined}
              alt={item.name}
              className="object-cover"
            />
            <AvatarFallback className="capitalize">{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p>{item.name}</p>
            <p className="text-xs text-muted-foreground hidden md:table-cell">
              {item?.email || "-"}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <TableCell>
          {item.id.length > 8
            ? `${item.id.substring(0, 8)}${"*".repeat(5)}`
            : item.id}
        </TableCell>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.subjects.length > 3 ? (
          <>
            {item.subjects.slice(0, 3).map((subject) => (
              <React.Fragment key={subject.id}>
                <Badge
                  variant="secondary"
                  className="ml-1 mb-1 capitalize hover:bg-slate-200 cursor-pointer"
                >
                  {subject.name}
                </Badge>
              </React.Fragment>
            ))}
            <Badge
              variant="secondary"
              className="ml-1 mb-1 capitalize hover:bg-slate-200 cursor-pointer"
            >
              +{item.subjects.length - 3} more
            </Badge>
          </>
        ) : (
          <>
            {item.subjects.map((subject) => (
              <React.Fragment key={subject.id}>
                <Badge
                  variant="secondary"
                  className="hover:bg-slate-200 cursor-pointer ml-1 mb-1 capitalize"
                >
                  {subject.name}
                </Badge>
              </React.Fragment>
            ))}
          </>
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.classes.length > 0 ? (
          item.classes.map((cls) => (
            <Badge
              key={cls.id}
              variant="secondary"
              className="ml-1 mb-1 capitalize"
            >
              {cls.name}
            </Badge>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item?.phone || "-"}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/list/teachers/${item.id}`} aria-label="View details">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          {role === "admin" && (
            <>
              <FormContainer table="teacher" type="update" data={item} />
              <FormContainer table="teacher" type="delete" id={item.id} />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const whereClause = {
    ...(queryParams.search && {
      OR: [
        {
          name: {
            contains: queryParams.search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          id: {
            contains: queryParams.search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          subjects: {
            some: {
              name: {
                contains: queryParams.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
        },
        {
          classes: {
            some: {
              name: {
                contains: queryParams.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
        },
      ],
    }),
  };

  const [teachers, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: whereClause,
      include: { subjects: true, classes: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({
      where: whereClause,
    }),
  ]);

  return (
    <>
      <TableCard<TeacherListType>
        renderRow={renderRow}
        data={teachers}
        columns={teacherColumns}
        page={p}
        count={count}
        title="All Teachers"
        table="teacher"
        queryParams={queryParams}
        role={role}
      />
    </>
  );
};

export default TeacherListPage;
