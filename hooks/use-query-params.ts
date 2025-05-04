import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

/**
 * Custom hook to manage query parameters in the URL.
 * It provides a way to get and set query parameters in the URL.
 * @param key - The key of the query parameter to be managed.
 * @returns  An object containing the current value of the query parameter and a function to update it.
 */
export const useQueryParam = (key: string, debounce: boolean = false) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [queryParam, setQueryParam] = useState<string>(
    searchParams.get(key) || "",
  );

  const updateQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleParamChange = useCallback(
    (value: string) => {
      setQueryParam(value);
      const queryString = updateQueryString(key, value);
      if (debounce) {
        /**
         * Debounce the URL update to avoid too many updates in a short time.
         */
        setTimeout(() => {
          window.history.replaceState(null, "", pathname + "?" + queryString);
        }, 500);
        return;
      } else {
        window.history.replaceState(null, "", pathname + "?" + queryString);
      }
    },
    [updateQueryString, pathname, key, debounce],
  );

  return { queryParam, handleParamChange };
};

export default useQueryParam;
