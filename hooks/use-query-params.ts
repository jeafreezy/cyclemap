import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom hook to manage query parameters in the URL.
 * It provides a way to get and set query parameters in the URL.
 * @param key - The key of the query parameter to be managed.
 * @returns  An object containing the current value of the query parameter and a function to update it.
 */
export const useQueryParam = (key: string, debounce: boolean = false) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [queryParam, setQueryParam] = useState(searchParams.get(key) || "");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    if (!debounce) {
      const queryString = updateQueryString(key, queryParam);
      window.history.replaceState(null, "", pathname + "?" + queryString);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const queryString = updateQueryString(key, queryParam);
      window.history.replaceState(null, "", pathname + "?" + queryString);
    }, 500);
  }, [queryParam, debounce, key, pathname, updateQueryString]);

  const handleParamChange = useCallback((value: string) => {
    setQueryParam(value);
  }, []);

  return { queryParam, handleParamChange };
};

export default useQueryParam;
