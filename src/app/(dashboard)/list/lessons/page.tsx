"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { lessonColumns } from "@/data/columns";
import { lessonsData, role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { LessonType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";

const LessonListPage = () => {
  // Row
  function renderRow(item: LessonType, index: number) {
    return (
      <TableRow key={item.id}>
        <TableCell>{index + 1}</TableCell>

        <TableCell className="flex items-center gap-4 p-4">
          {item.subject}
        </TableCell>
        <TableCell className="px-2">{item.class}</TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.teacher}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal table="lesson" type="update" data={item} />
                <FormModal table="lesson" type="delete" id={item.id} />
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableCard<LessonType>
        renderRow={renderRow}
        data={lessonsData}
        columns={lessonColumns}
        title="All Lessons"
        table="lesson"
      />
    </>
  );
};

export default LessonListPage;
