import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { FileMusic, ListPlus, LogIn, MicVocal, UserPlus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xl drop-shadow-lg"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="p-1">
            <Card className="bg-[#f8f8f8]">
              <CardContent className="flex h-36 items-center justify-end p-6 flex-col">
                <MicVocal size={60} color="#000000" />
                <p className=" flex font-inriaSans pt-3">
                  Instantly calculate a key that your vocalist will be able to
                  sing!
                </p>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card className="bg-[#f8f8f8]">
              <CardContent className="flex h-36 items-center justify-end p-6 flex-col">
                <UserPlus size={60} color="#000000" />
                <p className=" flex font-inriaSans pt-3">
                  Create an account for your church to be able to add or remove
                  members
                </p>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <Card className="bg-[#f8f8f8]">
              <CardContent className="flex h-36 items-center justify-end p-6 flex-col">
                <FileMusic size={60} color="#000000" />
                <p className="flex font-inriaSans pt-3">
                  Request for new songs to be added to the system.
                </p>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
