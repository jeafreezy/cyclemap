import { BikeNetwork } from "@/types";
import { BriefcaseBusiness } from "lucide-react";
import { useMemo } from "react";

export const BikeNetworkCompany = ({
  network,
  isNetworkDetailPage = false,
}: {
  network: BikeNetwork;
  isNetworkDetailPage?: boolean;
}) => {
  const companyDisplay = useMemo(() => {
    if (network.company.length === 0) {
      return <span className="italic">No companies available</span>;
    }

    const displayedCompanies = network.company.slice(0, 2).join(", ");
    const additionalCount = network.company.length - 2;

    if (isNetworkDetailPage) {
      return <span>{network.company.join(", ")}</span>;
    }

    return (
      <p
        className={`flex items-center leading-6 ${
          isNetworkDetailPage
            ? "text-toreabay-100 text-base"
            : "text-muted-foreground text-sm"
        }`}
      >
        <span className="truncate inline-block min-w-0 max-w-[150px]">
          {displayedCompanies}
        </span>
        {additionalCount > 0 && (
          <span className="text-grenadier-400 border border-grenadier-400 px-1.5 py-0.5 inline-flex items-center justify-center rounded whitespace-nowrap ml-1">
            +{additionalCount}
          </span>
        )}
      </p>
    );
  }, [network.company, isNetworkDetailPage]);

  return (
    <div className="flex items-center gap-x-3">
      <div
        className={`flex items-center justify-center w-6 h-6 shrink-0 ${
          !isNetworkDetailPage && "bg-toreabay-50"
        } rounded-sm`}
      >
        <BriefcaseBusiness
          className={`size-4 ${
            !isNetworkDetailPage ? "text-grenadier-400" : "text-toreabay-100"
          }`}
        />
      </div>
      <div>{companyDisplay}</div>
    </div>
  );
};
