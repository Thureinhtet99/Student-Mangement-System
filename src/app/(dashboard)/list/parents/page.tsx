import { parentColumns } from "@/data/columns";
import FormModal from "@/components/FormModal";
import { ParentListType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TableCard from "@/components/TableCard";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Link from "next/link";

const renderRow = async (item: ParentListType, index: number) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell>
        <p>{item.name}</p>
        <p className="text-xs text-muted-foreground hidden md:table-cell">
          {item?.email || "-"}
        </p>
      </TableCell>
      <TableCell>{item.id}</TableCell>
      <TableCell className="text-xs">
        {item.students.length > 0 ? (
          item.students.map((student, index) => (
            <React.Fragment key={student.id}>
              <Link
                href={`/list/students/${student.id}`}
                className="hover:text-blue-800 hover:underline"
              >
                {student.name}
              </Link>
              {index < item.students.length - 1 && ", "}
            </React.Fragment>
          ))
        ) : (
          <span className="text-gray-500">No students assigned</span>
        )}{" "}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item?.phone || "-"}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item?.address || "-"}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="parent" type="update" data={item} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="parent" type="delete" id={item.id} />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const ParentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const [parents, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: {
        ...(queryParams.search && {
          OR: [
            { name: { contains: queryParams.search, mode: "insensitive" } },
            { id: { contains: queryParams.search, mode: "insensitive" } },
            {
              students: {
                some: {
                  name: { contains: queryParams.search, mode: "insensitive" },
                },
              },
            },
          ],
        }),
      },
      include: { students: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.parent.count({
      where: {
        ...(queryParams.search && {
          OR: [
            { name: { contains: queryParams.search, mode: "insensitive" } },
            { id: { contains: queryParams.search, mode: "insensitive" } },
            {
              students: {
                some: {
                  name: { contains: queryParams.search, mode: "insensitive" },
                },
              },
            },
          ],
        }),
      },
    }),
  ]);

  return (
    <>
      <TableCard<ParentListType>
        renderRow={renderRow}
        data={parents}
        columns={parentColumns}
        page={p}
        count={count}
        title="All Parents"
        table="parent"
        queryParams={queryParams}
        role={role}
      />
    </>
  );
};

export default ParentListPage;
