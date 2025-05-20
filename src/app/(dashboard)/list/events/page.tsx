import Link from "next/link";
import { eventColumns } from "@/data/columns";
import { role } from "@/lib/data";
import { EventListType } from "@/types";
import TableCard from "@/components/TableCard";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { dateFormat, dateTimeFormat } from "@/lib/dataTimeFormat";

const renderRow = (item: EventListType, index: number) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell> {item.class?.name} </TableCell>
      <TableCell>{dateFormat(item.startTime)}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {dateTimeFormat(item.startTime)}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {dateTimeFormat(item.endTime)}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/list/lessons/${item.id}`} aria-label="View details">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          {role === "admin" && (
            <Button variant="ghost" size="icon" asChild>
              <FormModal table="event" type="delete" id={item.id} />
            </Button>
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

  const [events, count] = await prisma.$transaction([
    prisma.event.findMany({
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
    prisma.event.count({
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
      <TableCard<EventListType>
        renderRow={renderRow}
        data={events}
        columns={eventColumns}
        page={p}
        count={count}
        title="All Events"
        table="event"
        queryParams={queryParams}
      />
    </>
  );
};

export default ResultListPage;
