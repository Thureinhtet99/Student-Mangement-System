import Link from "next/link";
import { eventColumns } from "@/data/columns";
import { EventListType } from "@/types";
import TableCard from "@/components/TableCard";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { dateTimeFormat } from "@/lib/dataTimeFormat";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

const renderRow = async (item: EventListType, index: number) => {
  const { sessionClaims } = await auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell> {item.class?.name || "-"} </TableCell>
      <TableCell>
        {item.startTime ? dateTimeFormat(item.startTime) : "-"}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item.endTime ? dateTimeFormat(item.endTime) : "-"}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="event" type="update" data={item} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="event" type="delete" id={item.id} />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const ResultListPage = async ({
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
          { classId: null },
          // Teacher
          {
            class: {
              teacher: { id: userId! },
            },
          },
          // Student
          {
            class: {
              students: {
                some: { id: userId! },
              },
            },
          },
          // Parent
          {
            class: {
              students: {
                some: {
                  parent: { id: userId! },
                },
              },
            },
          },
        ],
      },
      ...(queryParams.search
        ? [
            {
              OR: [
                {
                  title: {
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
              ],
            },
          ]
        : []),
    ],
  };

  const [events, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: whereClause,
      include: { class: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.event.count({
      where: whereClause,
    }),
  ]);

  return (
    <>
      <TableCard<EventListType>
        renderRow={renderRow}
        data={events}
        columns={eventColumns}
        page={p}
        count={count}
        title="All Events"
        table="event"
        queryParams={queryParams}
        role={role}
      />
    </>
  );
};

export default ResultListPage;
