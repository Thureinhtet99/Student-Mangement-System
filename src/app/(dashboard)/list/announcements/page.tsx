import FormContainer from "@/components/FormContainer";
import FormModal from "@/components/FormModal";
import TableCard from "@/components/TableCard";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { announcementColumns } from "@/data/columns";
import { dateFormat } from "@/lib/dataTimeFormat";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { AnnouncementListType } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

const renderRow = async (item: AnnouncementListType, index: number) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell className="hidden md:table-cell text-xs">
        {item.description}
      </TableCell>
      <TableCell>{item.class?.name}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {item?.date ? dateFormat(item.date) : "-"}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="announcement" type="update" data={item} />
              <FormContainer table="announcement" type="delete" id={item.id} />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const AnnouncementListPage = async ({
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
        ...(role !== "admin" && {
          OR: [
            { classId: null },
            // Student
            {
              class: {
                students: {
                  some: {
                    id: userId!,
                  },
                },
              },
            },
          ],
        }),
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

  const [announcements, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: whereClause,
      include: { class: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({
      where: whereClause,
    }),
  ]);

  return (
    <>
      <TableCard<AnnouncementListType>
        renderRow={renderRow}
        data={announcements}
        columns={announcementColumns}
        page={p}
        count={count}
        title="All Announcements"
        table="announcement"
        queryParams={queryParams}
        role={role}
      />
    </>
  );
};

export default AnnouncementListPage;
