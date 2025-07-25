"use client";

import { BadgeListType } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import { Badge } from "./ui/badge";

const PeopleList = ({ table, text, route }: BadgeListType) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!table || table.length === 0) {
    return <span className="text-gray-400 text-xs italic">No {text}s yet</span>;
  }

  if (table.length <= 2) {
    return (
      <div className="flex flex-wrap items-center gap-1">
        {table.map((data, index) => (
          <React.Fragment key={data.id}>
            <Link
              href={`${route}/${data.id}`}
              className="text-secondColor hover:text-firstColor hover:underline transition-colors duration-200 text-xs font-medium"
            >
              {data.name}
            </Link>
            {index < table.length - 1 && (
              <span className="text-gray-400 text-sm">,</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1">
      {/* Always show first 2 items */}
      {table.slice(0, 2).map((data, index) => (
        <React.Fragment key={data.id}>
          <Link
            href={`${route}/${data.id}`}
            className="text-secondColor hover:text-firstColor hover:underline transition-colors duration-200 text-xs font-medium"
          >
            {data.name}
          </Link>
          {index < 1 && <span className="text-gray-400 text-sm">,</span>}
        </React.Fragment>
      ))}

      {/* Show remaining items if expanded */}
      {isExpanded && (
        <>
          {table.slice(2).map((data, index) => (
            <React.Fragment key={data.id}>
              <span className="text-gray-400 text-sm">,</span>
              <Link
                href={`${route}/${data.id}`}
                className="text-firstColor hover:text-secondColor hover:underline transition-colors duration-200 text-xs font-medium animate-in fade-in-0"
              >
                {data.name}
              </Link>
            </React.Fragment>
          ))}
        </>
      )}

      {/* Toggle button */}
      <Badge
        variant="outline"
        className="ml-1 hover:bg-blue-50 hover:border-firstColor hover:text-secondColor cursor-pointer text-firstColor border-secondColor transition-all duration-200 text-xs font-medium select-none"
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
            ? "Show fewer people"
            : `Show ${table.length - 2} more people`
        }
      >
        {isExpanded ? "Show less" : `+${table.length - 2} more`}
      </Badge>
    </div>
  );
};

export default PeopleList;
