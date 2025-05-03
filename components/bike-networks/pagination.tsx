"use client";
import { SEARCH_PARAMS_KEYS } from "@/configs";
import useQueryParam from "@/hooks/use-query-params";
import { BikeNetworks } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const Paginator = ({
  bikeNetworks,
  totalBikeNetworks,
}: {
  bikeNetworks: BikeNetworks;
  totalBikeNetworks: number;
}) => {
  const { queryParam: currentPage, handleParamChange } = useQueryParam(
    SEARCH_PARAMS_KEYS.PAGE,
  );

  const totalPages = Math.ceil(totalBikeNetworks / bikeNetworks.length);
  const currentPageNumber = parseInt(currentPage || "1", 10);

  const handlePageChange = (page: number) => {
    handleParamChange(page.toString());
  };

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
            className="font-semibold  text-primary cursor-pointer"
          />
        </PaginationItem>
        {pageRange.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPageNumber}
              className={`${page === currentPageNumber ? "bg-accent border-toreabay-200" : ""} cursor-pointer text-primary font-semibold hover:text-primary`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (currentPageNumber < totalPages) {
                handlePageChange(currentPageNumber + 1);
              }
            }}
            className="font-semibold  text-primary hover:text-primary cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
