import { classColumns } from "@/data/columns";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";
import { ClassListType } from "@/types";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Badge } from "@/components/ui/badge";
import React from "react";

const renderRow = (item: ClassListType, index: number) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {item.capacity || "-"}
      </TableCell>
      <TableCell>{item.teacher?.name || "-"}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {item.lessons.length > 3 ? (
          <>
            {item.lessons.slice(0, 3).map((lesson, index) => (
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
              +{item.lessons.length - 3} more
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
      <TableCell className="hidden md:table-cell text-xs">
        {item.students.length > 3 ? (
          <>
            {item.students
              .slice(0, 3)
              .map((student) => student.name)
              .join(", ")}
            <Badge
              variant="secondary"
              className="ml-1 hover:bg-slate-200 cursor-pointer"
            >
              +{item.students.length - 3} more
            </Badge>
          </>
        ) : (
          item.students.map((student) => student.name).join(", ")
        )}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="class" type="update" data={item} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="class" type="delete" id={item.id} />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const ClassListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const [classes, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: {
        ...(queryParams.search && {
          OR: [{ name: { contains: queryParams.search, mode: "insensitive" } }],
        }),
      },
      include: { teacher: true, lessons: true, students: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.class.count({
      where: {
        ...(queryParams.search && {
          OR: [{ name: { contains: queryParams.search, mode: "insensitive" } }],
        }),
      },
    }),
  ]);

  console.log(classes);

  return (
    <>
      <TableCard<ClassListType>
        renderRow={renderRow}
        data={classes}
        columns={classColumns}
        page={p}
        count={count}
        title="All Classes"
        table="class"
        queryParams={queryParams}
      />
    </>
  );
};

export default ClassListPage;
