import Link from "next/link";
import { studentColumns } from "@/data/columns";
import { role, studentsData } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { Eye } from "lucide-react";
import { StudentListType } from "@/types";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableCard from "@/components/TableCard";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { dateFormat } from "@/lib/dataTimeFormat";

const renderRow = (item: StudentListType, index: number) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="hidden md:table-cell">{index + 1}</TableCell>
      <TableCell className="py-0">
        <div className="flex items-center gap-x-3">
          <Avatar>
            <AvatarImage
              src={item.image || "/noAvatar.png"}
              alt={item.name}
              className="object-cover"
            />
            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">
              {item?.email || "-"}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>{item.id}</TableCell>
      <TableCell className="hidden md:table-cell">
        {item.gradeId || "-"}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item?.phone || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {item?.birthday ? dateFormat(item.birthday) : "-"}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {item?.bloodType || "-"}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-center md:gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/list/students/${item.id}`} aria-label="View details">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          {role === "admin" && (
            <Button variant="ghost" size="icon" asChild>
              <FormModal table="student" type="delete" id={item.id} />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

const StudentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const [students, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: {
        ...(queryParams.search && {
          OR: [
            { name: { contains: queryParams.search, mode: "insensitive" } },
            { email: { contains: queryParams.search, mode: "insensitive" } },
          ],
        }),
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count({
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
      <TableCard<StudentListType>
        renderRow={renderRow}
        data={students}
        columns={studentColumns}
        page={p}
        count={count}
        title="All Students"
        table="student"
        queryParams={queryParams}
      />
    </>
  );
};

export default StudentListPage;
