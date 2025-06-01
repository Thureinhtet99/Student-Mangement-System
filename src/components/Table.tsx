import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Table = ({
  columns,
  renderRow,
  data,
  role,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any, index: number) => React.ReactNode;
  data: any[];
  role?: string;
}) => {
  const filteredColumns = columns.filter(
    (col) => role === "admin" || !col.header.toLowerCase().includes("action")
  );

  return (
    <div className="rounded-md">
      <ShadcnTable>
        <TableHeader>
          <TableRow>
            {filteredColumns.map((col) => (
              <TableHead key={col.accessor} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={filteredColumns.length}
                className="text-center py-6 text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => renderRow(item, index))
          )}
        </TableBody>
      </ShadcnTable>
    </div>
  );
};

export default Table;
