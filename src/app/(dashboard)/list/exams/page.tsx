import { examColumns } from "@/data/columns";
import FormModal from "@/components/FormModal";
import { ExamListType } from "@/types";
import TableCard from "@/components/TableCard";
import { TableCell, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { role } from "@/lib/data";
import { dateTimeFormat } from "@/lib/dataTimeFormat";

const renderRow = (item: ExamListType, index: number) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell className="hidden md:table-cell">
        {item.lesson.subject.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.lesson.class.name}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item.lesson.teacher.name}
      </TableCell>
      <TableCell>
        {dateTimeFormat(item.startTime)} - {dateTimeFormat(item.endTime)}
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

  const [exams, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: {
        ...(queryParams.search && {
          OR: [
            { title: { contains: queryParams.search, mode: "insensitive" } },
            {
              lesson: {
                subject: {
                  name: { contains: queryParams.search, mode: "insensitive" },
                },
              },
            },
          ],
        }),
      },
      include: {
        lesson: {
          select: {
            subject: { select: { name: true, id: true } },
            class: {
              select: {
                name: true,
                id: true,
                teacherId: true,
                capacity: true,
                gradeId: true,
              },
            },
            teacher: {
              select: {
                name: true,
                id: true,
                username: true,
                email: true,
                phone: true,
                address: true,
                image: true,
                gender: true,
                createdAt: true,
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.exam.count({
      where: {
        ...(queryParams.search && {
          OR: [
            { title: { contains: queryParams.search, mode: "insensitive" } },
            {
              lesson: {
                subject: {
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
      <TableCard<ExamListType>
        renderRow={renderRow}
        data={exams}
        columns={examColumns}
        page={p}
        count={count}
        title="All Exams"
        table="exam"
        queryParams={queryParams}
      />
    </>
  );
};

export default ExamListPage;
