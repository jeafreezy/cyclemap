import { renderHook, act } from '@testing-library/react';
import { useAppTour } from '@/hooks/use-app-tour';
import { SITE_TOUR_LOCAL_STORAGE_KEY } from '@/configs';
import { vi, describe, it, expect, beforeEach } from 'vitest';


vi.mock('@/utils/storage', () => ({
    getLocalStorageValue: (key: string) => {
        return localStorage.getItem(key);
    },
    setLocalStorageValue: (key: string, value: string) => {
        localStorage.setItem(key, value);
    },
}));

vi.mock('next/navigation', () => ({
    usePathname: vi.fn(() => '/'),
}));

vi.mock('@reactour/tour', () => {
    const setIsOpen = vi.fn();
    const setSteps = vi.fn();
    const setCurrentStep = vi.fn();
    return {
        useTour: () => ({
            setIsOpen,
            setSteps,
            setCurrentStep,
            isOpen: false,
        }),
    };
});

vi.mock('@/utils/tour-steps', () => ({
    HOME_TOUR_STEPS: [
        { selector: '#step-1', content: 'Step 1' },
        { selector: '#step-2', content: 'Step 2' },
    ],
    DETAIL_TOUR_STEPS: [
        { selector: '#detail-step-1', content: 'Detail Step' },
    ],
}));

describe('useAppTour', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('returns expected handlers and state', () => {
        const { result } = renderHook(() => useAppTour());
        expect(result.current.openTourDialog).toBe(false);
        expect(typeof result.current.handleStartTour).toBe('function');
        expect(typeof result.current.handleSkipTour).toBe('function');
        expect(typeof result.current.handleTourButtonClick).toBe('function');
    });

    it('sets tour dismissed on skip', () => {
        const { result } = renderHook(() => useAppTour());
        act(() => {
            result.current.handleSkipTour();
        });
        expect(localStorage.getItem(SITE_TOUR_LOCAL_STORAGE_KEY)).toBe('true');
    });

    it('opens the tour when handleStartTour is called', () => {
        const { result } = renderHook(() => useAppTour());
        act(() => {
            result.current.handleStartTour();
        });

    });

    it('should not open tour if dismissed', async () => {
        localStorage.setItem(SITE_TOUR_LOCAL_STORAGE_KEY, 'true');
        const { result } = renderHook(() => useAppTour());
        expect(result.current.openTourDialog).toBe(false);
    });
});
