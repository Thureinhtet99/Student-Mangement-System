import Link from "next/link";
import { studentColumns } from "@/data/columns";
import FormModal from "@/components/FormModal";
import { Eye } from "lucide-react";
import { StudentListType } from "@/types";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableCard from "@/components/TableCard";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { dateFormat } from "@/lib/dataTimeFormat";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import FormContainer from "@/components/FormContainer";

const renderRow = async (item: StudentListType) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={item.id}>
      <TableCell className="py-0">
        <div className="flex items-center gap-x-3">
          <Avatar>
            <AvatarImage
              src={item.image || undefined}
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
        {item.id.length > 8
          ? `${item.id.substring(0, 8)}${"*".repeat(5)}`
          : item.id}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.class?.name || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.grade?.level || "-"}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item?.birthday ? dateFormat(item.birthday) : "-"}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item?.phone || "-"}
      </TableCell>

      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/list/students/${item.id}`} aria-label="View details">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          {role === "admin" && (
            <>
              <FormContainer table="student" type="update" data={item} />
              <FormContainer table="student" type="delete" id={item.id} />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const StudentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Create a base condition for search filters
  const searchCondition = queryParams.search
    ? {
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
            class: {
              name: {
                contains: queryParams.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
          ...(isNaN(parseInt(queryParams.search))
            ? []
            : [
                {
                  grade: {
                    level: { equals: parseInt(queryParams.search) },
                  },
                },
              ]),
        ],
      }
    : {};

  const whereClause =
    role === "admin"
      ? searchCondition
      : {
          AND: [
            {
              class: {
                teacherId: userId, // Teacher can only see their students
              },
            },
            searchCondition, // Apply search filter if provided
          ].filter((condition) => Object.keys(condition).length > 0), // Remove empty conditions
        };

  const [students, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: whereClause,
      include: { class: true, grade: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count({
      where: whereClause,
    }),
  ]);

  return (
    <>
      <TableCard<StudentListType>
        renderRow={renderRow}
        data={students}
        columns={studentColumns}
        page={p}
        count={count}
        title="All Students"
        table="student"
        queryParams={queryParams}
        role={role}
      />
    </>
  );
};

export default StudentListPage;
