import Image from "next/image";
import logo from "../images/SweetSpot WordMark@3x.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="font-inriaSans flex flex-col items-center">
      <Image
        src={logo}
        alt="SweetSpot Logo"
        className="mx-2 h-auto"
        style={{ height: "auto", width: "500px" }}
      ></Image>
      <h1 className="text-xl w-[48rem] text-center my-5">
        SweetSpot was built for Christian Worship Leaders as a tool to find a
        suitable key for their vocalist to sing in for a given song.
      </h1>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <span className="font-semibold">rich money</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <span className="font-semibold">rich money2</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <span className="font-semibold">rich money2</span>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
