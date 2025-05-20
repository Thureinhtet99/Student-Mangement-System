import FormModal from "@/components/FormModal";
import TableCard from "@/components/TableCard";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { announcementColumns } from "@/data/columns";
import { role } from "@/lib/data";
import { dateFormat } from "@/lib/dataTimeFormat";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { AnnouncementListType } from "@/types";

const renderRow = (item: AnnouncementListType, index: number) => (
  <TableRow key={item.id}>
    <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
    <TableCell>{item.title}</TableCell>
    <TableCell className="hidden md:table-cell">{item.description}</TableCell>
    <TableCell>{item.class?.name}</TableCell>
    <TableCell className="hidden lg:table-cell">
      {item?.date ? dateFormat(item.date) : "-"}
    </TableCell>
    <TableCell>
      <div className="flex justify-end items-center md:gap-2">
        {role === "admin" && (
          <>
            <Button variant="ghost" size="icon" asChild>
              <FormModal table="announcement" type="update" data={item} />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <FormModal table="announcement" type="delete" id={item.id} />
            </Button>
          </>
        )}
      </div>
    </TableCell>
  </TableRow>
);

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const [announcements, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: {
        ...(queryParams.search && {
          OR: [
            { title: { contains: queryParams.search, mode: "insensitive" } },
            {
              class: {
                name: { contains: queryParams.search, mode: "insensitive" },
              },
            },
          ],
        }),
      },
      include: { class: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({
      where: {
        ...(queryParams.search && {
          OR: [
            { title: { contains: queryParams.search, mode: "insensitive" } },
            {
              class: {
                name: { contains: queryParams.search, mode: "insensitive" },
              },
            },
          ],
        }),
      },
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
      />
    </>
  );
};

export default AnnouncementListPage;
