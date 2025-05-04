"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginatorProps = {
  totalItems: number;
  itemsPerPage: number;
  variant?: "primary" | "secondary";
  currentPage: number;
  handlePageChange: (page: number) => void;
};

export const Paginator = ({
  totalItems,
  itemsPerPage,
  variant = "primary",
  currentPage,
  handlePageChange,
}: PaginatorProps) => {
  const currentPageNumber = currentPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageRange = () => {
    const start = Math.max(1, currentPageNumber - 1);
    const end = Math.min(totalPages, Math.max(3, currentPageNumber + 1));
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const pageRange = getPageRange();

  return (
    <Pagination className="flex items-center justify-center my-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (currentPageNumber > 1) {
                handlePageChange(currentPageNumber - 1);
              }
            }}
            className={`font-semibold text-primary hover:text-primary cursor-pointer ${variant === "primary" ? "text-primary" : "text-base-white"}`}
          />
        </PaginationItem>

        {pageRange.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPageNumber}
              className={`
                cursor-pointer font-semibold
                ${
                  page === currentPageNumber
                    ? "bg-accent border-toreabay-200 text-primary hover:text-primary"
                    : variant === "secondary"
                      ? "text-base-white hover:text-primary"
                      : "text-primary hover:text-primary"
                }
              `}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPageNumber < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (currentPageNumber < totalPages) {
                handlePageChange(currentPageNumber + 1);
              }
            }}
            className={`font-semibold text-primary hover:text-primary cursor-pointer ${variant === "primary" ? "text-primary" : "text-base-white"}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
