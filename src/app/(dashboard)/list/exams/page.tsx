import { examColumns } from "@/data/columns";
import FormModal from "@/components/FormModal";
import { ExamListType } from "@/types";
import TableCard from "@/components/TableCard";
import { TableCell, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { dateFormat, timeFormat } from "@/lib/dataTimeFormat";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

const renderRow = async (item: ExamListType) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={item.id}>
      <TableCell>{item.title}</TableCell>
      <TableCell className="hidden md:table-cell">
        {item.subject.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.subject.class?.name}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item.subject.class?.teacher?.name}
      </TableCell>
      <TableCell>{dateFormat(item.startTime)}</TableCell>
      <TableCell className="hidden md:table-cell">
        {timeFormat(item.startTime)} - {timeFormat(item.endTime)}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="exam" type="update" data={item} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="exam" type="delete" id={item.id} />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const ExamListPage = async ({
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
            subject: {
              class: {
                teacher: { id: userId! },
              },
            },
          },
          // Student
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
          // Parent
          {
            subject: {
              class: {
                students: {
                  some: {
                    parent: { id: userId! },
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
                      name: {
                        contains: queryParams.search,
                        mode: Prisma.QueryMode.insensitive,
                      },
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

  const [exams, count] = await prisma.$transaction([
    prisma.exam.findMany({
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
    prisma.exam.count({
      where: whereClause,
    }),
  ]);

  return (
    <>
      <TableCard<ExamListType>
        renderRow={renderRow}
        data={exams}
        columns={examColumns}
        page={p}
        count={count}
        title="All Exams"
        table="exam"
        queryParams={queryParams}
        role={role}
      />
    </>
  );
};

export default ExamListPage;
