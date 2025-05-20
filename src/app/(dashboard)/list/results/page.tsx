import { resultColumns } from "@/data/columns";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { ResultListType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";

const renderRow = (item: ResultListType, index: number) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      {/* <TableCell>{item.subject || "-"}</TableCell> */}
      <TableCell> {item.student.name} </TableCell>
      <TableCell className="hidden md:table-cell">{item.score}</TableCell>
      {/* <TableCell className="hidden lg:table-cell">{item.teacher}</TableCell> */}
      <TableCell className="hidden md:table-cell">
        {item.student.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item.exam?.lesson?.class?.name}
      </TableCell>
      {/* <TableCell className="hidden md:table-cell">{item.date}</TableCell> */}
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

  const [results, count] = await prisma.$transaction([
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
        student: true,
        exam: {
          include: { lesson: true },
        },
        assignment: {
          include: { lesson: true },
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

  console.log(results);

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
      />
    </>
  );
};

export default ResultListPage;
