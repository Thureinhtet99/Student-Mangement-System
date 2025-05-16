"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { assignmentColumns } from "@/data/columns";
import { assignmentsData, role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { AssignmentType } from "@/types";
import TableCard from "@/components/TableCard";
import { TableCell, TableRow } from "@/components/ui/table";

const AssignmentListPage = () => {
  // Row
  function renderRow(item: AssignmentType, index: number) {
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
        <TableCell className="px-2">{item.dueDate}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal table="assignment" type="update" data={item} />
                <FormModal table="assignment" type="delete" id={item.id} />
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableCard<AssignmentType>
        renderRow={renderRow}
        data={assignmentsData}
        columns={assignmentColumns}
        title="All Assignments"
        table="assignment"
      />
    </>
  );
};

export default AssignmentListPage;
