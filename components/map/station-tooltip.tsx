export const BikeStationTooltip = ({
  name,
  freeBikes,
  emptySlots,
}: {
  name: string;
  freeBikes: number;
  emptySlots: number;
}) => {
  const total = freeBikes + emptySlots;
  const bikeRatio = total ? (freeBikes / total) * 100 : 0;
  const slotRatio = total ? (emptySlots / total) * 100 : 0;

  return (
    <div className="bg-white/80 p-4 rounded shadow-2xl w-48">
      <h3 className="text-sm font-medium text-primary">{name}</h3>
      <div className="flex justify-between mb-1">
        <span className="text-base-black text-[10px]">Bikes</span>
        <span className="font-medium text-[10px]">{freeBikes}</span>
      </div>
      <div className="w-full h-2 bg-[#0F172A29] rounded-full overflow-hidden mb-3">
        <div
          className={`${freeBikes === 0 ? "bg-[#DC2626]" : "bg-lime-500"} h-full`}
          style={{ width: `${freeBikes === 0 ? 100 : bikeRatio}%` }}
        />
      </div>

      <div className="flex justify-between mb-1">
        <span className="text-base-black text-[10px]">Slots</span>
        <span className="font-medium text-[10px]">{emptySlots}</span>
      </div>
      <div className="w-full h-2 bg-[#0F172A29] rounded-full overflow-hidden">
        <div
          className={`${emptySlots === 0 ? "bg-[#DC2626]" : "bg-lime-500"} h-full`}
          style={{ width: `${emptySlots === 0 ? 100 : slotRatio}%` }}
        />
      </div>
    </div>
  );
};
