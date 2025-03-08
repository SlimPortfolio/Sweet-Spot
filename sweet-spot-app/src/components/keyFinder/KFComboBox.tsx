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
  id: string;
  songLowNote?: string;
  songHighNote?: string;
  songOriginalKey?: string;
  vocalistLowNote?: string;
  vocalistHighNote?: string;
};
type KFCProps = {
  selections: SelectionObject[];
  filterPlaceholder?: string;
  placeholder: string;
  iconName?: string;
  selectedState: React.Dispatch<React.SetStateAction<object>>;
};

//KFCombo Box allows the user to pass through an array of objects to select from
//The must pass in a useState setter from the parent, an ID, and a label that will be displayed

export function KFComboBox(props: KFCProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [id, setId] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* popover trigger wraps the button, and when clicked on opens up */}
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between text-md text-gray-600"
          size={"lg"}
          //text-lg
        >
          {id
            ? //label is where we will find what is being displayed.
              //this section determines what will be displayed on the button that will be clicked
              props.selections.find((selection) => selection.id === id)?.label
            : props.placeholder}

          {
            //conditional logic for which icon will render
            props.iconName === "music" ? (
              <Music
                style={{ height: "25px", width: "25px" }}
                color="black"
                strokeWidth={2.5}
              />
            ) : props.iconName === "mic-vocal" ? (
              <MicVocal
                style={{ height: "25px", width: "25px" }}
                color="black"
                strokeWidth={2.5}
              />
            ) : (
              <ArrowUpDown
                style={{ height: "25px", width: "25px" }}
                color="black"
                strokeWidth={2.5}
              />
            )
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
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
                //each potential song / vocalist is mapped here as CommandItems
                <CommandItem
                  key={selection.id}
                  value={selection.value}
                  className="cursor-pointer"
                  onSelect={() => {
                    setId(selection.id === id ? "" : selection.id);
                    props.selectedState(selection);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      id === selection.id ? "opacity-100" : "opacity-0"
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
