"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { parentColumns } from "@/data/columns";
import { role, subjectsData } from "@/lib/data";
import FormModal from "@/components/FormModal";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const SubjectListPage = () => {
  // Row
  function renderRow(item: Subject) {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-fourthColor"
      >
        <td className="flex items-center gap-4 p-4">
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            {/* <p className="text-xs text-gray-500">{item?.email}</p> */}
          </div>
        </td>
        <td className="hidden md:table-cell px-2">
          {item.teachers.join(", ")}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal table="subject" type="update" data={item} />
                <FormModal table="subject" type="delete" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className="rounded-md bg-white p-4 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-secondColor">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-secondColor">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="subject" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table
        columns={parentColumns}
        renderRow={renderRow}
        data={subjectsData}
      />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default SubjectListPage;
