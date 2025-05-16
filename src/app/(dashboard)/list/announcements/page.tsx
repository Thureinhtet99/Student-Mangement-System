import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableCard from "@/components/TableCard";
import TableSearch from "@/components/TableSearch";
import { TableCell, TableRow } from "@/components/ui/table";
import { announcementColumns } from "@/data/columns";
import { announcementsData, role } from "@/lib/data";
import { AnnouncementType } from "@/types";
import Image from "next/image";

const AnnouncementListPage = () => {
  const renderRow = (item: AnnouncementType, index: number) => (
    <TableRow key={item.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell className="flex items-center gap-4 p-4">
        {item.title}
      </TableCell>
      <TableCell>{item.class}</TableCell>
      <TableCell className="hidden md:table-cell">{item.date}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="announcement" type="update" data={item} />
              <FormModal table="announcement" type="delete" id={item.id} />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      <TableCard<AnnouncementType>
        renderRow={renderRow}
        data={announcementsData}
        columns={announcementColumns}
        title="All Announcements"
        table="announcement"
      />
    </>
  );
};

export default AnnouncementListPage;
