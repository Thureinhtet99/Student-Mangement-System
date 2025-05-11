"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import { eventColumns } from "@/data/columns";
import { eventsData, role } from "@/lib/data";
import { EventListType } from "@/types";

const ResultListPage = () => {
  // Row
  function renderRow(item: EventListType) {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-fourthColor"
      >
        <td className="flex items-center gap-4 py-4 px-2">{item.title}</td>
        <td className="px-2"> {item.class} </td>
        <td className="hidden md:table-cell px-2"> {item.date} </td>
        <td className="hidden md:table-cell px-2"> {item.startTime} </td>
        <td className="hidden md:table-cell px-2"> {item.endTime} </td>
        <td className="flex items-center gap-2">
          <Link href={`/list/lessons/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-firstColor">
              <Image src="/edit.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-secondColor">
              <Image src="/delete.png" alt="" width={16} height={16} />
            </button>
          )}
        </td>
      </tr>
    );
  }

  return (
    <div className="rounded-md bg-white p-4 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-secondColor">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-secondColor">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-secondColor">
                <Image src="/plus.png" alt="" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* LIST */}
      <Table columns={eventColumns} renderRow={renderRow} data={eventsData} />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ResultListPage;
