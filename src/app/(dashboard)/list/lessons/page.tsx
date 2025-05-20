import { lessonColumns } from "@/data/columns";
import { lessonsData, role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { LessonListType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Button } from "@/components/ui/button";

const renderRow = (item: LessonListType, index: number) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell>{item.name}</TableCell>
      {/* <TableCell>{item.subject.name}</TableCell> */}
      {/* <TableCell className="hidden md:table-cell">{item.class.name}</TableCell> */}
      <TableCell className="hidden md:table-cell">
        {/* {item.teacher.name} */}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="lesson" type="update" data={item} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="lesson" type="delete" id={item.id} />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const LessonListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const [lessons, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: {
        ...(queryParams.search && {
          OR: [{ name: { contains: queryParams.search, mode: "insensitive" } }],
        }),
      },
      // include: { subject: true, class: true, teacher: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count({
      where: {
        ...(queryParams.search && {
          OR: [{ name: { contains: queryParams.search, mode: "insensitive" } }],
        }),
      },
    }),
  ]);

  return (
    <>
      <TableCard<LessonListType>
        renderRow={renderRow}
        data={lessons}
        columns={lessonColumns}
        page={p}
        count={count}
        title="All Lessons"
        table="lesson"
        queryParams={queryParams}
      />
    </>
  );
};

export default LessonListPage;
