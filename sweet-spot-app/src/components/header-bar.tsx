"use client";
import Image from "next/image";
import logo from "../images/SweetSpot WordMark@3x.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeaderBar() {
  const router = useRouter();
  return (
    <div className="bg-white flex h-20 items-center px-8 mb-6">
      <Image
        src={logo}
        alt="SweetSpot Logo"
        style={{ height: "35px", width: "200px" }}
        className="mx-2 cursor-pointer"
        onClick={() => router.push("/")}
      ></Image>
      <div className="flex-grow flex justify-end">
        <Button
          variant="ghost"
          className="text-ss-logo-blue font-inriaSans text-xl mx-2"
          onClick={() => router.push("/key-finder")}
        >
          Key Finder
        </Button>
        <Button
          variant="ghost"
          className="text-ss-logo-blue font-inriaSans text-xl mx-2"
          onClick={() => router.push("/manage-members")}
        >
          Manage Members
        </Button>
        <Button
          variant="ghost"
          className="bg-ss-logo-blue font-inriaSans text-xl text-white mx-2"
          onClick={() => router.push("/login")}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
