"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { resultColumns } from "@/data/columns";
import { resultsData, role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { ResultType } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import TableCard from "@/components/TableCard";

const ResultListPage = () => {
  // Row
  function renderRow(item: ResultType, index: number) {
    return (
      <TableRow key={item.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell className="flex items-center gap-4 p-4">
          {item.subject}
        </TableCell>
        <TableCell className="px-2"> {item.student} </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.score}
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.teacher}
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">
          {item.class}
        </TableCell>
        <TableCell className="hidden md:table-cell px-2">{item.date}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal table="result" type="update" data={item.id} />
                <FormModal table="result" type="delete" id={item.id} />
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableCard<ResultType>
        renderRow={renderRow}
        data={resultsData as ResultType[]}
        columns={resultColumns}
        title="All Results"
        table="result"
      />
    </>
  );
};

export default ResultListPage;
