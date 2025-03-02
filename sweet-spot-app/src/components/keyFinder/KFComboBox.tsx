"use client";

import * as React from "react";
import {
  ArrowUpDown,
  Check,
  ChevronsUpDown,
  MicVocal,
  Music,
} from "lucide-react";

import { cn } from "@/lib/utils";
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

type SelectionObject = {
  value: string;
  label: string;
};
type KFCProps = {
  selections: SelectionObject[];
  filterPlaceholder?: string;
  placeholder: string;
  iconName?: string;
};

export function KFComboBox(props: KFCProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  console.log(props);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? props.selections.find((selection) => selection.value === value)
                ?.label
            : props.placeholder}
          {props.iconName === "music" ? (
            <Music />
          ) : props.iconName === "mic-vocal" ? (
            <MicVocal />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={
              props.filterPlaceholder ? props.filterPlaceholder : "Search..."
            }
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {props.selections.map((selection) => (
                <CommandItem
                  key={selection.value}
                  value={selection.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === selection.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {selection.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
