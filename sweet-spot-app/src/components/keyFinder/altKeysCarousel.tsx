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
import { capoSuggestion } from "@/utils/key-calculation";
type allAltKeysProps = {
  allAltKeys: {
    key: string;
    delta: number;
  }[];
};
export function AltKeysCarousel(props: allAltKeysProps) {
  let startIndex = props.allAltKeys.findIndex((object) => object.delta === 0);
  const [currIndex, setCurrIndex] = useState(0);
  function handleIndexUpdate(index: number) {
    setCurrIndex(index);
  }
  console.log(JSON.stringify(props.allAltKeys));
  console.log(
    JSON.stringify(capoSuggestion.get(props.allAltKeys[currIndex].key))
  );
  let carouselCapoSuggestion = capoSuggestion.get(
    props.allAltKeys[currIndex].key
  );
  console.log("differenetial", currIndex - startIndex);
  let differential = currIndex - startIndex;
  return (
    <div className="flex flex-col items-center flex-grow">
      <span className="font-semibold text-md">Other Singable Keys</span>
      <p className="text-md text-center">
        <span>Differential: </span>
        <span
          className={
            differential < 0
              ? "text-red-600"
              : differential > 0
              ? "text-green-800"
              : "black"
          }
        >
          {differential > 0 ? `+${differential}` : differential}
        </span>
      </p>
      <Carousel
        className="w-[140px]"
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
                <div className="">
                  <Card className="w-[40px] h-[40px] items-center justify-center flex">
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {altKey.key}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[1rem] top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-[1rem] top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
      <p className="text-sm italic">
        {props.allAltKeys[currIndex].key !== "C" &&
        props.allAltKeys[currIndex].key !== "G"
          ? `${carouselCapoSuggestion?.chordFamily} Chords - Capo: ${carouselCapoSuggestion?.capoValue}`
          : "No Capo"}
      </p>
    </div>
  );
}
