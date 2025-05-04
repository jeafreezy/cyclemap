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
        <p className="text-sm leading-5 text-zinc-500">
          Lorem ipsum dolor sit amet consectetur. A volutpat adipiscing placerat
          turpis magna sem tempor amet faucibus. Arcu praesent viverra
          pellentesque nisi quam in rhoncus.
        </p>
      </div>
    </header>
  );
};
