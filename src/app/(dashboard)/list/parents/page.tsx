import { parentColumns } from "@/data/columns";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { ParentListType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TableCard from "@/components/TableCard";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";

const renderRow = (item: ParentListType, index: number) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell>
        <p className="font-medium">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item?.email || "-"}</p>
      </TableCell>
      <TableCell className="text-xs">
        {item.students.map((student) => student.name).join(", ")}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item?.phone || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item?.address || "-"}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          {role === "admin" && (
            <>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="parent" type="update" data={item} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <FormModal table="parent" type="delete" id={item.id} />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const ParentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const [parents, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: {
        ...(queryParams.search && {
          OR: [
            { name: { contains: queryParams.search, mode: "insensitive" } },
            { email: { contains: queryParams.search, mode: "insensitive" } },
          ],
        }),
      },
      include: { students: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.parent.count({
      where: {
        ...(queryParams.search && {
          OR: [
            { name: { contains: queryParams.search, mode: "insensitive" } },
            { email: { contains: queryParams.search, mode: "insensitive" } },
          ],
        }),
      },
    }),
  ]);

  return (
    <>
      <TableCard<ParentListType>
        renderRow={renderRow}
        data={parents}
        columns={parentColumns}
        page={p}
        count={count}
        title="All Parents"
        table="parent"
        queryParams={queryParams}
      />
    </>
  );
};

export default ParentListPage;
