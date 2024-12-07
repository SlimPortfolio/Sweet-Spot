"use client";

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
import { CarouselPlugin } from "@/components/carousel-plugin";

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
        SweetSpot is a tool for Christian Worship Leaders to find a suitable key
        for their vocalists to sing songs in.
      </h1>
      <CarouselPlugin />
    </div>
  );
}
