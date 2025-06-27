import { resultColumns } from "@/data/columns";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { ResultListType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { dateFormat } from "@/lib/dataTimeFormat";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import FormContainer from "@/components/FormContainer";

const renderRow = async (item: ResultListType) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={item.id}>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.studentName}</TableCell>
      <TableCell>{item.score}</TableCell>
      <TableCell className="hidden md:table-cell">
        {item?.className || "-"}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item?.teacherName || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item?.startTime ? dateFormat(item.startTime) : "-"}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
                <FormContainer table="result" type="update" data={item.id} />
                <FormContainer table="result" type="delete" id={item.id} />
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
          // Teacher
          {
            student: {
              class: {
                teacher: { id: userId! },
              },
            },
          },
          // Student
          {
            student: { id: userId! },
          },
          // Parent
          {
            student: { parent: { id: userId! } },
          },
        ],
      },
      ...(queryParams.search
        ? [
            {
              OR: [
                {
                  exam: {
                    title: {
                      contains: queryParams.search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                },
                {
                  assignment: {
                    title: {
                      contains: queryParams.search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                },
                {
                  student: {
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

  const [resultsResponse, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: whereClause,
      include: {
        student: {
          include: {
            class: {
              include: {
                teacher: true,
              },
            },
          },
        },
        exam: {
          include: {
            subject: {
              include: { class: true },
            },
          },
        },
        assignment: {
          include: {
            subject: {
              include: { class: true },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.result.count({
      where: whereClause,
    }),
  ]);

  const results = resultsResponse.map((item) => {
    return {
      id: item.id,
      score: item.score,
      title: item.exam.title || item.assignment.title,
      studentName: item.student.name,
      className:
        item.exam.subject.class?.name ||
        item.assignment.subject.class?.name ||
        "",
      teacherName: item.student.class?.teacher?.name || "",
      startTime: item.exam.startTime || item.assignment?.dueDate,
    };
  });

  return (
    <>
      <TableCard<ResultListType>
        renderRow={renderRow}
        data={results}
        columns={resultColumns}
        page={p}
        count={count}
        title="All Results"
        table="result"
        queryParams={queryParams}
        role={role}
      />
    </>
  );
};

export default ResultListPage;
