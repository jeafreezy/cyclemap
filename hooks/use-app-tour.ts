import { APPLICATION_ROUTES, SITE_TOUR_LOCAL_STORAGE_KEY } from "@/configs";
import { getLocalStorageValue, setLocalStorageValue } from "@/utils/storage";
import { DETAIL_TOUR_STEPS, HOME_TOUR_STEPS } from "@/utils/tour-steps";
import { useTour } from "@reactour/tour";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

/**
 *  Custom hook to manage the application tour.
 * @returns  {object} - An object containing the state and functions to control the tour.
 */
export const useAppTour = () => {
  const [openTourDialog, setOpenTourDialog] = useState<boolean>(false);

  const pathname = usePathname();

  const { setIsOpen, setSteps, setCurrentStep } = useTour();

  const tourDismissed =
    getLocalStorageValue(SITE_TOUR_LOCAL_STORAGE_KEY) === "true";

  const isDetailPage = pathname.includes(
    APPLICATION_ROUTES.NETWORK_DETAIL_BASE,
  );

  const getVisibleSteps = useCallback(() => {
    const steps = isDetailPage ? DETAIL_TOUR_STEPS : HOME_TOUR_STEPS;
    return steps.filter((step) => document.querySelector(step.selector));
  }, [isDetailPage]);

  const handleTourButtonClick = () => {
    const visibleSteps = getVisibleSteps();
    setSteps?.(visibleSteps);
    setCurrentStep(0);
    setIsOpen(true);
  };

  const handleSkipTour = () => {
    setOpenTourDialog(false);
    setIsOpen(false);
    setLocalStorageValue(SITE_TOUR_LOCAL_STORAGE_KEY, "true");
  };
  const handleStartTour = () => {
    setOpenTourDialog(false);
    setIsOpen(true);
  };

  /**
   *  Open the tour dialog after 5s.
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tourDismissed) return;
      const visibleSteps = getVisibleSteps();
      setSteps?.(visibleSteps);
      setCurrentStep(0);
      if (isDetailPage) {
        setIsOpen(true);
      } else {
        setOpenTourDialog(true);
      }
      setLocalStorageValue(SITE_TOUR_LOCAL_STORAGE_KEY, "false");
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [
    pathname,
    tourDismissed,
    setOpenTourDialog,
    setSteps,
    setCurrentStep,
    isDetailPage,
    setIsOpen,
    getVisibleSteps,
  ]);

  return {
    openTourDialog,
    handleTourButtonClick,
    handleSkipTour,
    handleStartTour,
  };
};
