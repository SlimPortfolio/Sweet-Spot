import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CircleHelp, Settings2 } from "lucide-react";
type advancedSettingsProps = {
  isGuitarFriendly: boolean;
  optimalKey: boolean;
};
type KFPopoverProps = {
  advancedSettings: advancedSettingsProps;
  advancedSettingsSetter: React.Dispatch<
    React.SetStateAction<advancedSettingsProps>
  >;
};
export function KFPopover(props: KFPopoverProps) {
  function handleOptimizedKeySwitch(checked: boolean) {
    // props.advancedSettings({
    //   isGuitarFriendly: true,
    //   optimalKey: true,
    // });
    props.advancedSettingsSetter((previousState) => ({
      ...previousState,
      optimalKey: checked,
    }));
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex-grow ml-4">
          Advanced Search
          <Settings2
            style={{ height: "25px", width: "25px" }}
            color="black"
            strokeWidth={2}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100%]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Advanced Search Settings
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Switch
                id="optimizedKeySwitch"
                onCheckedChange={handleOptimizedKeySwitch}
                checked={props.advancedSettings.optimalKey}
              />
              <Label htmlFor="optimizedKeySwitch">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Optimized Key</TooltipTrigger>
                    <TooltipContent>
                      <p>
                        When enabled, Key-Finder will provide the most optimal
                        key. By default, the program avoids flat and sharp keys.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
