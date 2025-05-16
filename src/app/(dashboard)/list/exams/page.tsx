"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { examColumns } from "@/data/columns";
import { examsData, role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { ExamType } from "@/types";
import TableCard from "@/components/TableCard";
import { TableCell, TableRow } from "@/components/ui/table";

const ExamListPage = () => {
  function renderRow(item: ExamType, index: number) {
    return (
      <TableRow key={item.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell className="flex items-center gap-4 p-4">
          {item.subject}
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.class}
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.teacher}
        </TableCell>
        <TableCell className="px-2">{item.date}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal table="exam" type="update" data={item} />
                <FormModal table="exam" type="delete" id={item.id} />
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableCard<ExamType>
        renderRow={renderRow}
        data={examsData}
        columns={examColumns}
        title="All Exams"
        table="exam"
      />
    </>
  );
};

export default ExamListPage;
