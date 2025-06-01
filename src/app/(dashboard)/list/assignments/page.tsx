import { assignmentColumns } from "@/data/columns";
import FormModal from "@/components/FormModal";
import { AssignmentListType } from "@/types";
import TableCard from "@/components/TableCard";
import { TableCell, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import {  dateTimeFormat } from "@/lib/dataTimeFormat";
import { Prisma } from "@prisma/client";

const renderRow = async (item: AssignmentListType, index: number) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell className="hidden md:table-cell">
        {item.subject.name}
      </TableCell>
      <TableCell>{item.dueDate ? dateTimeFormat(item.dueDate) : "-"}</TableCell>
      <TableCell className="hidden md:table-cell">
        {item.subject.class?.name}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item.subject.class?.teacher?.name}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="assignment" type="update" data={item} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="assignment" type="delete" id={item.id} />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Create base where condition
  const whereClause = {
    AND: [
      {
        OR: [
          {
            subject: {
              class: {
                teacher: {
                  id: userId!,
                },
              },
            },
          },
          {
            subject: {
              class: {
                students: {
                  some: {
                    id: userId!,
                  },
                },
              },
            },
          },
          {
            subject: {
              class: {
                students: {
                  some: {
                    parent: {
                      id: userId!,
                    },
                  },
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
                  subject: {
                    name: {
                      contains: queryParams.search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                },
                {
                  subject: {
                    class: {
                      teacher: {
                        name: {
                          contains: queryParams.search,
                          mode: Prisma.QueryMode.insensitive,
                        },
                      },
                    },
                  },
                },
              ],
            },
          ]
        : []),
    ],
  };

  const [assignments, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: whereClause,
      include: {
        subject: {
          include: {
            class: {
              include: { teacher: true },
            },
          },
        },
        results: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({
      where: whereClause,
    }),
  ]);

  return (
    <>
      <TableCard<AssignmentListType>
        renderRow={renderRow}
        data={assignments}
        columns={assignmentColumns}
        page={p}
        count={count}
        title="All Assignments"
        table="assignment"
        queryParams={queryParams}
        role={role}
      />
    </>
  );
};

export default AssignmentListPage;
