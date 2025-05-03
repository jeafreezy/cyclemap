import { BikeNetworks, Station } from "@/types";
import { useMemo } from "react";

/**
 * Custom hook to paginate data.
 * @param data - The data to be paginated (array of stations or bike networks).
 * @param page - The current page number.
 * @param pageSize - The number of items per page.
 * @returns The paginated data.
 */
export const usePaginator = (
  data: Station[] | BikeNetworks,
  page: number,
  pageSize: number,
): Station[] | BikeNetworks => {
  return useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, page, pageSize]);
};
