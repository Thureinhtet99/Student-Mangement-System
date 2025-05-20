import { subjectColumns } from "@/data/columns";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";
import { SubjectListType } from "@/types";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React from "react";

const renderRow = (item: SubjectListType, index: number) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell className="hidden md:table-cell text-xs">
        {item.teachers.map((teacher) => teacher.name).join(", ")}
      </TableCell>
      <TableCell>
        {item.lessons.length > 2 ? (
          <>
            {item.lessons.slice(0, 2).map((lesson, index) => (
              <React.Fragment key={lesson.id}>
                <Badge
                  variant="secondary"
                  className="ml-1 mb-1 hover:bg-slate-200 cursor-pointer"
                >
                  {lesson.name}
                </Badge>
              </React.Fragment>
            ))}
            <Badge
              variant="secondary"
              className="ml-1 mb-1 hover:bg-slate-200 cursor-pointer"
            >
              +{item.lessons.length - 2} more
            </Badge>
          </>
        ) : (
          <>
            {item.lessons.map((lesson, index) => (
              <React.Fragment key={lesson.id}>
                <Badge
                  variant="secondary"
                  className="hover:bg-slate-200 cursor-pointer"
                >
                  {lesson.name}
                </Badge>
              </React.Fragment>
            ))}
          </>
        )}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="subject" type="update" data={item} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="subject" type="delete" id={item.id} />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const SubjectListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const [subjects, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: {
        ...(queryParams.search && {
          OR: [{ name: { contains: queryParams.search, mode: "insensitive" } }],
        }),
      },
      include: { teachers: true, lessons: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({
      where: {
        ...(queryParams.search && {
          OR: [{ name: { contains: queryParams.search, mode: "insensitive" } }],
        }),
      },
    }),
  ]);

  return (
    <>
      <TableCard<SubjectListType>
        renderRow={renderRow}
        data={subjects}
        columns={subjectColumns}
        page={p}
        count={count}
        title="All Subjects"
        table="subject"
        queryParams={queryParams}
      />
    </>
  );
};

export default SubjectListPage;
