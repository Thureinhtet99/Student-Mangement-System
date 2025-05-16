"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { subjectColumns } from "@/data/columns";
import { role, subjectsData } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { SubjectType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";

const SubjectListPage = () => {
  // Row
  function renderRow(item: SubjectType, index: number) {
    return (
      <TableRow
        key={item.id}
        className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-fourthColor"
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell className="flex items-center gap-4 p-4">
          {item.name}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {item.teachers.join(", ")}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal table="subject" type="update" data={item} />
                <FormModal table="subject" type="delete" id={item.id} />
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableCard<SubjectType>
        renderRow={renderRow}
        data={subjectsData}
        columns={subjectColumns}
        title="All Subjects"
        table="subject"
      />
    </>
  );
};

export default SubjectListPage;
