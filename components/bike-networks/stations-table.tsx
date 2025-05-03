import { Column, ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { Station } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    >
      {title}
      <ArrowUpDown className="size-4" />
    </Button>
  );
};

const columnDefinitions = (): ColumnDef<Station>[] => [
  {
    accessorKey: "name",
    header: "STATION NAME",
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
      return (
        <span className="block font-bold text-[16px] text-center">
          {row.getValue() as string}
        </span>
      );
    },
  },

  {
    accessorKey: "empty_slots",
    header: ({ column }) => (
      <SortableHeader title={"empty slots"} column={column} />
    ),
    cell: (row) => {
      return (
        <span className="block text-center text-[16px] font-bold">
          {row.getValue() as string}
        </span>
      );
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
