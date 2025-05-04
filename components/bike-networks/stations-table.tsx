import { Column, ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { Station } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TOUR_IDS } from "@/utils/tour-steps";

export const SortableHeader = <TData, TValue>({
  title,
  column,
}: {
  title: string;
  column: Column<TData, TValue>;
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-x-2 uppercase cursor-pointer hover:bg-transparent hover:text-white"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      id={TOUR_IDS.TABLE_SORTER}
      aria-label={`Sort by ${title}`}
    >
      {title}
      <ArrowUpDown className="size-4" aria-hidden="true" />
    </Button>
  );
};

const columnDefinitions = (): ColumnDef<Station>[] => [
  {
    accessorKey: "name",
    header: () => <span className="text-nowrap">STATION NAME</span>,
    cell: (row) => {
      return (
        <span className="block transition-transform duration-500 group-hover:translate-x-2 text-base">
          {row.getValue() as string}
        </span>
      );
    },
  },
  {
    accessorKey: "free_bikes",
    header: ({ column }) => (
      <SortableHeader title={"free bikes"} column={column} />
    ),
    cell: (row) => {
      return <span className="table-cell">{row.getValue() as string}</span>;
    },
  },

  {
    accessorKey: "empty_slots",
    header: ({ column }) => (
      <SortableHeader title={"empty slots"} column={column} />
    ),
    cell: (row) => {
      return <span className="table-cell">{row.getValue() as string}</span>;
    },
  },
];

export const BikeNetworkStationsTable = ({
  stations,
}: {
  stations: Station[];
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  return (
    <DataTable
      data={stations}
      columns={columnDefinitions()}
      sorting={sorting}
      setSorting={setSorting}
    />
  );
};
