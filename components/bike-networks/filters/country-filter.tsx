"use client";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import countries from "@/data/countries.json";
import useQueryParam from "@/hooks/use-query-params";
import { SEARCH_PARAMS_KEYS } from "@/configs";
import { TOUR_IDS } from "@/utils/tour-steps";
import { getCountryNameFromCode } from "@/utils/country-helper";

export const CountryFilter = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { queryParam, handleParamChange } = useQueryParam(
    SEARCH_PARAMS_KEYS.COUNTRY,
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id={TOUR_IDS.COUNTRY_FILTER}
          role="combobox"
          aria-expanded={open}
          className={`min-w-28 flex cursor-pointer hover:text-primary gap-x-1 text-primary justify-between rounded-full border-accent ${open && "border-primary"} text-ellipsis overflow-hidden py-6 px-3`}
        >
          <MapPin className="size-4 text-secondary-foreground" />
          <span className="w-full truncate">
            {queryParam
              ? getCountryNameFromCode(queryParam)
              : "Country"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border-accent" align="end">
        <Command>
          <CommandInput placeholder="Search country" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.data.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={(currentValue) => {
                    handleParamChange(
                      currentValue === queryParam ? "" : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  {country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
