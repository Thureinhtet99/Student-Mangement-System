"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { TableSearchType } from "@/types";

const TableSearch = ({ table, queryParams = {} }: TableSearchType) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [isPending, startTransition] = useTransition();

  // Create query string from current search params and new value
  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // Search
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      // Sort
      const currentSort = searchParams.get("sort");
      if (currentSort) {
        params.set("sort", currentSort);
      }

      // Reset to page 1 when searching
      params.set("page", "1");

      // Preserve other query params
      Object.entries(queryParams).forEach(([key, value]) => {
        if (key !== "search" && key !== "sort" && key !== "page" && value) {
          params.set(key, String(value));
        }
      });

      return params.toString();
    },
    [searchParams, queryParams]
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      router.push(`${pathname}?${createQueryString(searchValue)}`);
    });
  };

  const handleButtonClick = () => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString(searchValue)}`);
    });
  };

  return (
    <div className="relative w-full md:w-[280px]">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Input
            type="search"
            placeholder={`Search ${
              table === "class" ? table + "es" : table + "s"
            }...`}
            className={`h-9 pr-12 md:text-sm text-sm rounded-md border my-0 border-input bg-background transition-all duration-200 ${
              isPending
                ? "border-secondColor ring-2 ring-firstColor shadow-sm opacity-75"
                : "hover:border-secondColor focus:border-firstColor"
            }`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
            disabled={isPending}
            onClick={handleButtonClick}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            ) : (
              <Search className="h-4 w-4 text-muted-foreground hover:text-blue-500" />
            )}
          </Button>
        </div>
      </form>

      {/* Search status indicator */}
      {isPending && (
        <div className="absolute top-full left-0 text-xs text-firstColor flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Searching...</span>
        </div>
      )}
    </div>
  );
};

export default TableSearch;
