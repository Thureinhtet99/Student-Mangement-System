"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const TableSearch = ({ queryParams = {} }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  // Create query string from current search params and new value
  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // Reset to page 1 when searching
      params.set("page", "1");

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      // Preserve other query params
      Object.entries(queryParams).forEach(([key, value]) => {
        if (key !== "search" && key !== "page" && value) {
          params.set(key, String(value));
        }
      });

      return params.toString();
    },
    [searchParams, queryParams]
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${pathname}?${createQueryString(searchValue)}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full md:w-[260px]">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 h-9 rounded-md border border-input bg-background"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
};

export default TableSearch;
