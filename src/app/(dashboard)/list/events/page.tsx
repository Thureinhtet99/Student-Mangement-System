"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import { eventColumns } from "@/data/columns";
import { eventsData, role } from "@/lib/data";
import { EventListType } from "@/types";
import TableCard from "@/components/TableCard";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import FormModal from "@/components/FormModal";

const ResultListPage = () => {
  // Row
  function renderRow(item: EventListType, index: number) {
    return (
      <TableRow key={item.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell className="flex items-center gap-4 py-4 px-2">
          {item.title}
        </TableCell>
        <TableCell className="px-2"> {item.class} </TableCell>
        <TableCell className="hidden md:table-cell px-2">{item.date}</TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.startTime}
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.endTime}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/list/lessons/${item.id}`} aria-label="View details">
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            {role === "admin" && (
              <FormModal table="event" type="delete" id={item.id} />
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableCard<EventListType>
        renderRow={renderRow}
        data={eventsData}
        columns={eventColumns}
        title="All Events"
        table="event"
      />
    </>
  );
};

export default ResultListPage;
