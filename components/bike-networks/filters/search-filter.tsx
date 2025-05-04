"use client";
import { SEARCH_PARAMS_KEYS } from "@/configs";
import useQueryParam from "@/hooks/use-query-params";
import { TOUR_IDS } from "@/utils/tour-steps";
import { Search } from "lucide-react";

export const SearchBarFilter = () => {
  const { queryParam, handleParamChange } = useQueryParam(
    SEARCH_PARAMS_KEYS.SEARCH,
    true,
  );
  return (
    <div
      id={TOUR_IDS.SEARCH_INPUT}
      className="flex items-center w-full py-2 px-4 rounded-full text-primary border border-accent focus-within:border-primary transition-colors"
    >
      <label htmlFor="search" className="sr-only">
        Search bike networks
      </label>
      <Search
        className="size-4 md:size-6 shrink-0 font-thin stroke-[1px]"
        aria-hidden="true"
      />
      <input
        id="search"
        type="text"
        value={queryParam}
        placeholder="Search network"
        onChange={(e) => handleParamChange(e.target.value)}
        className="flex-1 ml-2 p-1 text-sm placeholder:text-primary outline-none"
      />
    </div>
  );
};
