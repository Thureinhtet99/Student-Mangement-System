import { lessonColumns } from "@/data/columns";
import FormModal from "@/components/FormModal";
import { LessonListType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import FormContainer from "@/components/FormContainer";

const renderRow = async (item: LessonListType) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.subject.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {/* {item.class.name} */}-
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {/* {item.class.teacher?.name} */}-
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="lesson" type="update" data={item} />
              <FormContainer table="lesson" type="delete" id={item.id} />
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

  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // const whereClause = {
  //   AND: [
  //     {
  //       OR: [
  //         // Teacher
  //         {
  //           subject: {
  //             class: {
  //               teacher: { id: userId! },
  //             },
  //           },
  //         },
  //         // Student
  //         {
  //           subject: {
  //             class: {
  //               students: {
  //                 some: {
  //                   id: userId!,
  //                 },
  //               },
  //             },
  //           },
  //         },
  //         // Parent
  //         {
  //           subject: {
  //             class: {
  //               students: {
  //                 some: {
  //                   parent: { id: userId! },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     ...(queryParams.search
  //       ? [
  //           {
  //             OR: [
  //               {
  //                 name: {
  //                   contains: queryParams.search,
  //                   mode: Prisma.QueryMode.insensitive,
  //                 },
  //               },
  //               {
  //                 subject: {
  //                   name: {
  //                     contains: queryParams.search,
  //                     mode: Prisma.QueryMode.insensitive,
  //                   },
  //                 },
  //               },
  //             ],
  //           },
  //         ]
  //       : []),
  //   ],
  // };

  const [lessons, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      // where: whereClause,
      include: { subject: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count({
      // where: whereClause,
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
        role={role}
      />
    </>
  );
};

export default LessonListPage;
