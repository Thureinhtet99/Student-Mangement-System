import React, { ReactNode } from "react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormContainer from "./FormContainer";
import TableSort from "./TableSort";

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
    | "announcement"
    | "attendance";
  count: number;
  page: number;
  queryParams: { [key: string]: string | undefined };
  role?: string;
};

const TableCard = async <T extends Record<string, any>>({
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
  const serializedQueryParams = await JSON.parse(JSON.stringify(queryParams));

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <CardHeader className="py-4 px-2 bg-muted/20">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex w-full items-center justify-between md:block">
                <CardTitle className="text-md md:text-lg font-semibold text-foreground">
                  {title}
                </CardTitle>
                {/* Mobile: Add and Sort button inline with title */}
                <div className="flex md:hidden items-center gap-2">
                  <TableSort
                    viewType="mobile-view"
                    queryParams={serializedQueryParams}
                  />
                  {role === "admin" && (
                    <Button variant="ghost" size="icon" title="Add">
                      <FormContainer table={table} type="create" />
                    </Button>
                  )}
                </div>
              </div>
              {/* Desktop: Search bar and controls side by side */}
              <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <div className="hidden md:flex items-center gap-2">
                  <TableSearch
                    table={table}
                    queryParams={serializedQueryParams}
                  />
                  <div className="flex items-center gap-2">
                    {/* Sort Select */}
                    <TableSort
                      viewType="web-view"
                      queryParams={serializedQueryParams}
                      type={table}
                    />

                    {role === "admin" && (
                      <Button variant="ghost" size="icon" title="Add">
                        <FormContainer table={table} type="create" />
                      </Button>
                    )}
                  </div>
                </div>
                {/* Mobile: Search bar below title/buttons */}
                <div className="flex md:hidden w-full">
                  <TableSearch
                    table={table}
                    queryParams={serializedQueryParams}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 my-1">
          <Table
            columns={columns}
            renderRow={renderRow}
            data={data}
            role={role}
          />
        </CardContent>
      </div>
      <div className="my-1">
        <Pagination page={page} count={count} hasNextPage={data.length > 0} />
      </div>
    </>
  );
};

export default TableCard;
