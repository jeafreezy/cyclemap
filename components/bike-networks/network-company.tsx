import { BikeNetwork } from "@/types";
import { BriefcaseBusiness } from "lucide-react";

export const BikeNetworkCompany = ({
  network,
  isNetworkDetailPage = false,
}: {
  network: BikeNetwork;
  isNetworkDetailPage?: boolean;
}) => {
  const companies = network.company;
  const fullCompanyList = companies.join(", ");
  const displayedCompanies = companies.slice(0, 2).join(", ");
  const additionalCount = companies.length - 2;

  return (
    <div
      className="flex items-center gap-x-3"
      aria-label={`Company: ${fullCompanyList || "No companies available"}`}
    >
      <div
        className={`flex items-center justify-center w-6 h-6 shrink-0 rounded-sm ${
          !isNetworkDetailPage && "bg-toreabay-50"
        }`}
      >
        <BriefcaseBusiness
          className={`size-4 ${
            !isNetworkDetailPage ? "text-grenadier-400" : "text-toreabay-100"
          }`}
        />
      </div>

      {companies.length === 0 ? (
        <span className="italic text-sm text-muted-foreground">
          No companies available
        </span>
      ) : isNetworkDetailPage ? (
        <span className="text-base text-toreabay-100">{fullCompanyList}</span>
      ) : (
        <div className="flex items-center text-sm text-muted-foreground leading-6 flex-wrap">
          <span
            className="truncate inline-block min-w-0 max-w-[150px]"
            title={fullCompanyList}
          >
            {displayedCompanies}
          </span>
          {additionalCount > 0 && (
            <span className="ml-1 text-grenadier-400 border border-grenadier-400 px-1.5 py-0.5 inline-flex items-center justify-center rounded whitespace-nowrap">
              +{additionalCount}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
