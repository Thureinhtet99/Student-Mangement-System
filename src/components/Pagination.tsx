"use client";

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Pagination = ({
  page: currentPage = 1,
  count: totalPages = 1,
  hasNextPage = false,
}: PaginationType) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport width on mount and when resized
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Hide pagination if there's only 1 page or no pages
  if (totalPages <= 1) {
    return null;
  }

  // Generate an array of pages to display
  const getPageNumbers = () => {
    const pages = [];
    // Reduce number of pages shown on mobile
    const showDirect = isMobile ? 1 : 3;

    // Always show first page
    pages.push(1);

    // Add first ellipsis if needed
    if (currentPage > showDirect + 1) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add pages around current page
    const startPage = Math.max(2, currentPage - (isMobile ? 0 : 1));
    const endPage = Math.min(totalPages - 1, currentPage + (isMobile ? 0 : 1));

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        // Don't duplicate first and last pages
        pages.push(i);
      }
    }

    // Add last ellipsis if needed
    // if (currentPage < totalPages - showDirect) {
    //   pages.push(-2); // -2 represents ellipsis
    // }

    // Always show last page if it exists and isn't already included
    // if (totalPages > 1) {
    //   pages.push(totalPages);
    // }

    return pages;
  };

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  const isNextDisabled =
    currentPage === totalPages || !hasNextPage || totalPages === 0;
  const isPrevDisabled = currentPage === 1;

  return (
    <PaginationRoot>
      <PaginationContent className="flex flex-wrap gap-1 sm:gap-0">
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (!isPrevDisabled) {
                changePage(currentPage - 1);
              }
            }}
            aria-disabled={isPrevDisabled}
            className={`${
              isPrevDisabled
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            } text-xs sm:text-sm`}
            aria-label="Go to previous page"
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === -1 || page === -2 ? (
              <PaginationEllipsis
                aria-hidden="true"
                className="text-xs sm:text-sm"
              />
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  changePage(page);
                }}
                className="cursor-pointer text-xs sm:text-sm h-8 w-8 sm:h-10 sm:w-10"
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (!isNextDisabled) {
                changePage(currentPage + 1);
              }
            }}
            aria-disabled={isNextDisabled}
            className={`${
              isNextDisabled
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            } text-xs sm:text-sm`}
            aria-label="Go to next page"
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};

export default Pagination;
