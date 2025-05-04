"use client";
import { SITE_TOUR_LOCAL_STORAGE_KEY } from "@/configs";
import { setLocalStorageValue } from "@/utils/storage";
import { TourProvider } from "@reactour/tour";

export const SiteTourWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TourProvider
      steps={[]}
      scrollSmooth
      onClickClose={({ setIsOpen }) => {
        setIsOpen(false);
        setLocalStorageValue(SITE_TOUR_LOCAL_STORAGE_KEY, "true");
      }}
      padding={{
        popover: [5, 10],
      }}
      styles={{
        popover: (base) => ({
          ...base,
          "--reactour-accent": "#f0581f", //grenadier-500
          borderRadius: 8,
          color: "#000",
        }),
        maskArea: (base) => ({ ...base, rx: 8 }),
        badge: (base) => ({ ...base, left: "auto", right: "-0.8125em" }),
        controls: (base) => ({ ...base, marginTop: 100 }),
        close: (base) => ({ ...base, right: "auto", left: 10, top: 10 }),
      }}
    >
      {children}
    </TourProvider>
  );
};
