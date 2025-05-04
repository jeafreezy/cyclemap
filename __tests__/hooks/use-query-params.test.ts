import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";


vi.mock("next/navigation", () => {
    return {
        useSearchParams: () => new URLSearchParams("foo=bar"),
        usePathname: () => "/test",
    };
});

import useQueryParam from "@/hooks/use-query-params";

describe("useQueryParam", () => {
    beforeEach(() => {
        window.history.replaceState(null, "", "/test?foo=bar");
    });

    it("returns the initial query param value", () => {
        const { result } = renderHook(() => useQueryParam("foo"));
        expect(result.current.queryParam).toBe("bar");
    });

    it("updates the query param value without debounce", () => {
        const { result } = renderHook(() => useQueryParam("foo"));

        act(() => {
            result.current.handleParamChange("baz");
        });

        expect(window.location.search).toBe("?foo=baz");
    });

    it("updates the query param value with debounce", () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => useQueryParam("foo", true));

        act(() => {
            result.current.handleParamChange("buzz");
        });

        expect(window.location.search).toBe("?foo=bar");

        vi.advanceTimersByTime(500);

        expect(window.location.search).toBe("?foo=buzz");

        vi.useRealTimers();
    });
});
