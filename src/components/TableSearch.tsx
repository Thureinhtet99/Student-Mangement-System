import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const TableSearch = () => {
  return (
    <div className="relative w-full md:w-[260px]">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 h-9 rounded-md border border-input bg-background"
      />
    </div>
  );
};

export default TableSearch;