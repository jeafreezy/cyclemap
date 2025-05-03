import { Column, ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { Station } from "@/types";
import { useState } from "react";

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
};

export const SortableHeader = <TData, TValue>({
  title,
  column,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  return (
    <span
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex items-center gap-x-2 uppercase text-nowrap"
    >
      {title}
      <ArrowUpDown className="size-4" />
    </span>
  );
};

const columnDefinitions = (): ColumnDef<Station>[] => [
  {
    accessorKey: "name",
    header: "STATION NAME",
  },

  {
    accessorKey: "free_bikes",
    header: ({ column }) => (
      <SortableHeader title={"free bikes"} column={column} />
    ),
    cell: (row) => {
      return <span className="font-bold">{row.getValue() as string}</span>;
    },
  },

  {
    accessorKey: "empty_slots",
    header: ({ column }) => (
      <SortableHeader title={"empty slots"} column={column} />
    ),
    cell: (row) => {
      return <span className="font-bold">{row.getValue() as string}</span>;
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
