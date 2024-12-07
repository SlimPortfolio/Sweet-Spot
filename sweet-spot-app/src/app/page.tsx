"use client";

import Image from "next/image";
import logo from "../images/SweetSpot WordMark@3x.png";
import { CarouselPlugin } from "@/components/carousel-plugin";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="font-inriaSans flex flex-col items-center">
      <Image
        src={logo}
        alt="SweetSpot Logo"
        className="mx-2 h-auto"
        style={{ height: "auto", width: "500px" }}
      ></Image>
      <h1 className="text-2xl w-[48rem] text-center my-5">
        SweetSpot is a tool for Christian Worship Leaders to find a suitable key
        for their vocalists to sing songs in.
      </h1>
      <CarouselPlugin />
      <Button
        variant="destructive"
        className="bg-[#e54f46] font-bold mt-6 font-sans drop-shadow-md"
        onClick={() => router.push("/key-finder")}
      >
        GET STARTED
      </Button>
    </div>
  );
}
