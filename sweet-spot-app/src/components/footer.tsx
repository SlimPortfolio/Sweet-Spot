"use client";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <div className="bg-ss-background-blue flex fixed bottom-0 w-dvw h-24 p-5 z-50">
      <div className="grow flex flex-col justify-end ">
        <h1 className="font-inriaSans text-white text-3xl ">
          <strong>SweetSpot</strong>
        </h1>
      </div>
      <div className="text-white text-sm justify-end flex flex-col px-5 items-end">
        <p
          className="cursor-pointer hover:underline hover:duration-1000"
          onClick={() => router.push("/song-request")}
        >
          Request a Song
        </p>
        <p
          className="cursor-pointer hover:underline"
          onClick={() => router.push("/contact")}
        >
          Contact Us
        </p>
        <p
          className="cursor-pointer hover:underline"
          onClick={() => router.push("/about")}
        >
          About
        </p>
      </div>
    </div>
  );
}
