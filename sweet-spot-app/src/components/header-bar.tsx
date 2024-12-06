import Image from "next/image";
import logo from "../images/SweetSpot WordMark@3x.png";
import { Button } from "@/components/ui/button";

export default function HeaderBar() {
  return (
    <div className="bg-white flex h-16 items-center">
      <Image
        src={logo}
        alt="SweetSpot Logo"
        style={{ height: "35px", width: "200px" }}
      ></Image>
      <div className="flex-grow flex justify-end">
        <Button
          variant="ghost"
          className="text-ss-logo-blue font-inriaSans text-xl"
        >
          Key Finder
        </Button>
        <Button
          variant="ghost"
          className="text-ss-logo-blue font-inriaSans text-xl"
        >
          Manage Members
        </Button>
        <Button
          variant="ghost"
          className="bg-ss-logo-blue font-inriaSans text-xl text-white"
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
