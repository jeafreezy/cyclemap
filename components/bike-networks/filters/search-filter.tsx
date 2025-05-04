"use client";
import { SEARCH_PARAMS_KEYS } from "@/configs";
import useQueryParam from "@/hooks/use-query-params";
import { Search } from "lucide-react";

export const SearchBarFilter = () => {
  const { queryParam, handleParamChange } = useQueryParam(
    SEARCH_PARAMS_KEYS.SEARCH,
    true,
  );
  return (
    <div className="flex items-center w-full py-2 px-4 rounded-full text-primary border border-accent focus-within:border-primary transition-colors">
      <Search className="size-6 font-thin stroke-[1px]" />
      <input
        type="text"
        value={queryParam}
        placeholder="Search network"
        onChange={(e) => handleParamChange(e.target.value)}
        className="flex-1 ml-2 p-1 text-sm placeholder:text-primary outline-none"
      />
    </div>
  );
};
