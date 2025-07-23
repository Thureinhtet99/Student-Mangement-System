"use client";

import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { BadgeListType } from "@/types";

const BadgeList = ({ table }: BadgeListType) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!table || table.length === 0) {
    return <span>-</span>;
  }

  if (table.length <= 2) {
    return (
      <div className="flex flex-wrap gap-1">
        {table.map((data) => (
          <Badge
            key={data.id}
            variant="secondary"
            className="hover:bg-slate-200 transition-colors duration-200 text-xs font-medium"
          >
            {data.name}
          </Badge>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1">
      {/* Always show first 2 items */}
      {table.slice(0, 2).map((data) => (
        <Badge
          key={data.id}
          variant="secondary"
          className="hover:bg-slate-200 transition-colors duration-200 text-xs font-medium"
        >
          {data.name}
        </Badge>
      ))}

      {/* Show remaining items if expanded */}
      {isExpanded && (
        <>
          {table.slice(2).map((data) => (
            <Badge
              key={data.id}
              variant="secondary"
              className="hover:bg-slate-200 transition-colors duration-200 text-xs font-medium animate-in fade-in-0"
            >
              {data.name}
            </Badge>
          ))}
        </>
      )}

      {/* Toggle button */}
      <Badge
        variant="outline"
        className="hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 cursor-pointer text-blue-600 border-blue-200 transition-all duration-200 text-xs font-medium select-none"
        onClick={toggleExpanded}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleExpanded();
          }
        }}
        aria-label={
          isExpanded
            ? "Show fewer items"
            : `Show ${table.length - 2} more items`
        }
      >
        {isExpanded ? "Show less" : `+${table.length - 2} more`}
      </Badge>
    </div>
  );
};

export default BadgeList;
