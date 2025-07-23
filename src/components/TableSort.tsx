"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  CalendarDays,
  SortAsc,
  SortDesc,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";
import {
  sortingData,
  resultSortingData,
  attendanceSortingData,
} from "@/data/sortingData";
import { useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TableSortType } from "@/types";

const TableSort = ({ viewType, queryParams, type }: TableSortType) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const currentSort = searchParams.get("sort") || "newest";

  const getSortIcon = (sortType: string) => {
    switch (sortType) {
      case "Newest":
      case "newest":
        return <Calendar className="h-4 w-4 flex-shrink-0" />;
      case "Oldest":
      case "oldest":
        return <CalendarDays className="h-4 w-4 flex-shrink-0" />;
      case "Name (A-Z)":
      case "ascending_name":
      case "ascending_student_name":
        return <SortAsc className="h-4 w-4 flex-shrink-0" />;
      case "Name (Z-A)":
      case "descending_name":
      case "descending_student_name":
        return <SortDesc className="h-4 w-4 flex-shrink-0" />;
      case "Score (High to Low)":
      case "score_high":
        return <TrendingUp className="h-4 w-4 flex-shrink-0" />;
      case "Score (Low to High)":
      case "score_low":
        return <TrendingDown className="h-4 w-4 flex-shrink-0" />;
      default:
        return <Calendar className="h-4 w-4 flex-shrink-0" />;
    }
  };

  // Get responsive text for mobile
  const getMobileText = (sortType: string) => {
    switch (sortType) {
      case "Newest":
        return "New";
      case "Oldest":
        return "Old";
      case "Name (A-Z)":
        return "A-Z";
      case "Name (Z-A)":
        return "Z-A";
      case "Score (High to Low)":
        return "High";
      case "Score (Low to High)":
        return "Low";
      default:
        return sortType;
    }
  };

  // Create query string from current search params and new value
  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // Sort
      if (value) {
        params.set("sort", value);
      } else {
        params.delete("sort");
      }

      // Search
      const currentSearch = searchParams.get("search");
      if (currentSearch) {
        params.set("search", currentSearch);
      }

      // Reset to page 1 when sorting
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

  const handleSortChange = (value: string) => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString(value)}`);
    });
  };

  // Get current sort display data
  const currentSortingData =
    type === "result"
      ? resultSortingData
      : type === "attendance"
      ? attendanceSortingData
      : sortingData;
  const currentSortData = currentSortingData.find(
    (data) => data.value === currentSort
  );

  return (
    <div className="relative w-full">
      <Select
        value={currentSort}
        onValueChange={handleSortChange}
        disabled={isPending}
      >
        <SelectTrigger
          className={`bg-white
            ${
              viewType === "web-view"
                ? "w-40 min-w-[200px]"
                : "w-auto min-w-[90px] sm:min-w-[140px]"
            } 
            h-10 transition-all duration-100
            ${isPending ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <div className="flex-1 min-w-0">
            {viewType === "web-view" ? (
              <SelectValue placeholder="Sort by" />
            ) : (
              <div className="flex items-center gap-1 min-w-0">
                {currentSortData && (
                  <span className="flex-shrink-0">
                    {getSortIcon(currentSortData.sortType)}
                  </span>
                )}
                <span className="text-sm font-medium truncate">
                  <span className="hidden sm:inline">
                    {currentSortData?.sortType || "Sort by"}
                  </span>
                  <span className="sm:hidden">
                    {currentSortData
                      ? getMobileText(currentSortData.sortType)
                      : "Sort"}
                  </span>
                </span>
              </div>
            )}
          </div>
        </SelectTrigger>
        <SelectContent className="min-w-[160px] sm:min-w-[200px] max-w-[90vw]">
          {currentSortingData.map((data) => (
            <SelectItem
              key={data.sortType}
              value={data.value}
              className="cursor-pointer transition-colors duration-150 py-2"
            >
              <div className="flex items-center gap-2 w-full">
                {getSortIcon(data.sortType)}
                <span className="flex-1 min-w-0 text-left">
                  <span className="hidden sm:inline text-sm">
                    {data.sortType}
                  </span>
                  <span className="sm:hidden text-xs font-medium">
                    {getMobileText(data.sortType)}
                  </span>
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Sorting status indicator */}
      {isPending && (
        <div className="absolute top-full left-0 text-xs text-firstColor flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Sorting...</span>
        </div>
      )}
    </div>
  );
};

export default TableSort;
