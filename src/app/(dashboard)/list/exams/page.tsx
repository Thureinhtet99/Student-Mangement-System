"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { examsColumns } from "@/data/columns";
import { examsData, role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { ExamType } from "@/types";

const ExamListPage = () => {
  function renderRow(item: ExamType) {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-fourthColor"
      >
        <td className="flex items-center gap-4 p-4">{item.subject}</td>
        <td className="hidden md:table-cell px-2"> {item.class} </td>
        <td className="hidden md:table-cell px-2"> {item.teacher} </td>
        <td className="px-2"> {item.date} </td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal table="exam" type="update" data={item} />
                <FormModal table="exam" type="delete" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className="rounded-md bg-white px-4 py-2 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-secondColor">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-secondColor">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="exam" type="create" />}
          </div>
        </div>
      </div>
      
      {/* LIST */}
      <Table columns={examsColumns} renderRow={renderRow} data={examsData} />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ExamListPage;
