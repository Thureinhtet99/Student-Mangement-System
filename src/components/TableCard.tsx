import React, { ReactNode } from "react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { Filter, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TableCardProps<T> = {
  renderRow: (item: T, index: number) => ReactNode;
  data: T[];
  columns: { header: string; accessor: string }[];
  title: string;
  table:
    | "teacher"
    | "student"
    | "parent"
    | "class"
    | "subject"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "event"
    | "announcement";
  count: number;
  page: number;
  queryParams: { [key: string]: string | undefined };
  role?: string;
};

const TableCard = <T extends Record<string, any>>({
  renderRow,
  data,
  columns,
  title,
  table,
  page,
  count,
  queryParams,
  role,
}: TableCardProps<T>) => {
  return (
    <>
      <Card className="flex-1 overflow-y-auto border-0">
        <CardHeader className="py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <TableSearch queryParams={queryParams} />
              <div className="flex items-center gap-2 self-end">
                <Button variant="outline" size="icon" title="Filter">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Sort">
                  <SortDesc className="h-4 w-4" />
                </Button>
                {role === "admin" && <FormModal table={table} type="create" />}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-0">
          <Table
            columns={columns}
            renderRow={renderRow}
            data={data}
            role={role}
          />
        </CardContent>
      </Card>
      <div className="my-2">
        <Pagination page={page} count={count} hasNextPage={data.length > 0} />
      </div>
    </>
  );
};

export default TableCard;
