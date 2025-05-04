import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BikeNetwork } from "@/types";
import { BikeNetworkCity } from "@/components/bike-networks/network-city";
import { BikeNetworkCompany } from "@/components/bike-networks/network-company";
import { BikeNetworkDetailHeroBackgroundImage } from "@/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const BikeNetworkHero = ({ network }: { network: BikeNetwork }) => {
  const router = useRouter();
  return (
    <div
      className="relative w-full min-h-64 overflow-hidden"
      role="region"
      aria-label={`Information about ${network.name}`}
    >
      <Image
        src={BikeNetworkDetailHeroBackgroundImage}
        alt="Bike Network Background"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-toreabay-800 via-toreabay-700/60 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-between px-10 py-8 gap-y-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          aria-label="Go back to previous page"
          className="bg-base-white size-10 rounded-full cursor-pointer hover:bg-base-white p-4"
        >
          <ArrowLeft className="size-4 text-grenadier-400" />
        </Button>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold leading-8">{network.name}</h1>
          <div>
            <BikeNetworkCity
              networkLocation={network.location}
              isNetworkDetailPage
            />
            <BikeNetworkCompany network={network} isNetworkDetailPage />
          </div>
        </div>
      </div>
    </div>
  );
};
