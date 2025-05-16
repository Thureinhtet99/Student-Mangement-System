"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { parentColumns } from "@/data/columns";
import { role, parentsData } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { ParentType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TableCard from "@/components/TableCard";

const ParentListPage = () => {
  // Row
  function renderRow(item: ParentType, index: number) {
    return (
      <TableRow key={item.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item?.email}</p>
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.students.join(", ")}
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item?.phone}
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item?.address}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              {role === "admin" && (
                <>
                  <FormModal table="parent" type="update" data={item} />
                  <FormModal table="parent" type="delete" id={item.id} />
                </>
              )}
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableCard<ParentType>
        renderRow={renderRow}
        data={parentsData}
        columns={parentColumns}
        title="All Parents"
        table="parent"
      />
    </>
  );
};

export default ParentListPage;
