const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={`${col.className} px-2`}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((data) => renderRow(data))}</tbody>
    </table>
  );
};

export default Table;
