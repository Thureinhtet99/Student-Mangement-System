"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { classColumns } from "@/data/columns";
import { classesData, role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { ClassType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";

const ClassListPage = () => {
  // Row
  function renderRow(item: ClassType, index: number) {
    return (
      <TableRow
        key={item.id}
        className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-fourthColor"
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell className="flex items-center gap-4 p-4">
          {item.name}
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.grade}{" "}
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.capacity}{" "}
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.supervisor}{" "}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal table="class" type="update" data={item} />
                <FormModal table="class" type="delete" id={item.id} />
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableCard<ClassType>
        renderRow={renderRow}
        data={classesData}
        columns={classColumns}
        title="All Classes"
        table="class"
      />
    </>
  );
};

export default ClassListPage;
