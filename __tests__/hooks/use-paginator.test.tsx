import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { usePaginator } from "@/hooks/use-pagination";
import { BikeNetworks } from "@/types";

const mockData = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 })) as unknown as BikeNetworks;

describe("usePaginator", () => {
    it("returns correct slice for page 1", () => {
        const { result } = renderHook(() => usePaginator(mockData, 1, 3));
        expect(result.current).toEqual([
            { id: 1 },
            { id: 2 },
            { id: 3 },
        ]);
    });

    it("returns correct slice for page 2", () => {
        const { result } = renderHook(() => usePaginator(mockData, 2, 3));
        expect(result.current).toEqual([
            { id: 4 },
            { id: 5 },
            { id: 6 },
        ]);
    });

    it("returns remaining items on last page", () => {
        const { result } = renderHook(() => usePaginator(mockData, 4, 3));
        expect(result.current).toEqual([{ id: 10 }]);
    });

    it("returns empty array if page is out of range", () => {
        const { result } = renderHook(() => usePaginator(mockData, 5, 3));
        expect(result.current).toEqual([]);
    });
});
