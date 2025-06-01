import { resultColumns } from "@/data/columns";import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { ResultListType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { dateFormat } from "@/lib/dataTimeFormat";
import { auth } from "@clerk/nextjs/server";

const renderRow = async (item: ResultListType, index: number) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell>{item.title || "-"}</TableCell>
      <TableCell>{item.studentName}</TableCell>
      <TableCell>{item.score}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {item.teacherName || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.className || "-"}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item.startTime ? dateFormat(item.startTime) : "-"}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="result" type="update" data={item.id} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="result" type="delete" id={item.id} />
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

  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const [resultsResponse, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: {
        ...(queryParams.search && {
          OR: [
            {
              exam: {
                title: { contains: queryParams.search, mode: "insensitive" },
              },
            },
            {
              assignment: {
                title: { contains: queryParams.search, mode: "insensitive" },
              },
            },
            {
              student: {
                name: { contains: queryParams.search, mode: "insensitive" },
              },
            },
          ],
        }),
      },
      include: {
        student: { select: { name: true } },
        exam: {
          select: {
            title: true,
            startTime: true,
            lesson: {
              select: {
                class: {
                  select: {
                    name: true,
                    teacher: true,
                  },
                },
              },
            },
          },
        },
        assignment: {
          select: {
            title: true,
            dueDate: true,
            lesson: {
              select: {
                class: {
                  select: {
                    name: true,
                    teacher: true,
                  },
                },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.result.count({
      where: {
        ...(queryParams.search && {
          OR: [
            {
              exam: {
                title: { contains: queryParams.search, mode: "insensitive" },
              },
            },
            {
              assignment: {
                title: { contains: queryParams.search, mode: "insensitive" },
              },
            },
            {
              student: {
                name: { contains: queryParams.search, mode: "insensitive" },
              },
            },
          ],
        }),
      },
    }),
  ]);

  const results = resultsResponse.map((item) => {
    const assessment = item.exam || item.assignment;
    const isExam = assessment && "startTime" in assessment;

    return {
      id: item.id,
      score: item.score,

      title: assessment?.title,
      studentName: item.student.name,
      teacherName: assessment?.lesson.class.teacher?.name,
      className: assessment?.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment?.dueDate,
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
