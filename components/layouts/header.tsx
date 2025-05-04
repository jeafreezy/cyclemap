import { BikeIcon } from "lucide-react";

export const Header = () => {
  return (
    <header>
      <div className="text-grenadier-400 flex items-center gap-2">
        <BikeIcon className="size-6" />
        <span className="font-semibold text-xl leading-7">CycleMap</span>
      </div>
      <div className="pt-6 space-y-4">
        <h1 className="text-primary text-3xl leading-10 font-semibold">
          Discover bike networks
        </h1>
        <p className="text-sm leading-5 text-zinc-500 max-w-lg">
          Explore bike-sharing systems across the world with CycleMap. Find
          networks by city or country, view their locations on the map, and plan
          your next ride effortlessly.
        </p>
      </div>
    </header>
  );
};
