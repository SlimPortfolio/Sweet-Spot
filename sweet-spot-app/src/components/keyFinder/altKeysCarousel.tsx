import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
type allAltKeysProps = {
  allAltKeys: {
    key: string;
    delta: number;
  }[];
};
export function AltKeysCarousel(props: allAltKeysProps) {
  console.log(props.allAltKeys);
  let startIndex = props.allAltKeys.findIndex((object) => object.delta === 0);
  console.log("start index", startIndex);
  const [currIndex, setCurrIndex] = useState(0);
  function handleIndexUpdate(index: number) {
    setCurrIndex(index);
  }
  console.log(currIndex);

  return (
    <div className="flex flex-col items-center justify-center mt-[2rem] ">
      <span>Other Singable Keys</span>
      <Carousel
        className="w-[200px]"
        opts={{ startIndex: startIndex }}
        indexHandle={handleIndexUpdate}
      >
        <CarouselContent>
          {props.allAltKeys.map((altKey, index) => {
            return (
              <CarouselItem
                key={index}
                className="flex justify-center items-center"
              >
                <div className="p-1 w-[50px]">
                  <Card className="h-[50px] items-center justify-center flex">
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {altKey.key}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          className="absolute left-[2rem] top-1/2 transform -translate-y-1/2 z-10"
          id="carouselButtonPrev"
        />
        <CarouselNext className="absolute right-[2rem] top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
