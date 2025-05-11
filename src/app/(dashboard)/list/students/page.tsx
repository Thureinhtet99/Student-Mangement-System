"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import { studentColumns } from "@/data/columns";
import { role, studentsData } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { Eye } from "lucide-react";
import { StudentType } from "@/types";

const StudentListPage = () => {
  // Row
  function renderRow(item: StudentType ) {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-fourthColor"
      >
        <td className="flex items-center gap-4 py-4 px-2">
          <Image
            src={item.photo}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.class}</p>
          </div>
        </td>
        <td className="hidden md:table-cell px-2">{item.studentId}</td>
        <td className="hidden md:table-cell px-2">{item.grade}</td>
        <td className="hidden md:table-cell px-2">{item?.phone}</td>
        <td className="hidden md:table-cell px-2">{item?.address}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              href={`/list/students/${item.id}`}
              className="text-secondColor"
            >
              <Eye />{" "}
            </Link>
            {role === "admin" && (
              <FormModal table="student" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-secondColor">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-secondColor">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table
        columns={studentColumns}
        renderRow={renderRow}
        data={studentsData}
      />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;
