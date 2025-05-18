"use client";
import Image from "next/image";
import logo from "../images/SweetSpot WordMark@3x.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

export default function HeaderBar() {
  const router = useRouter();
  return (
    <div className="px-8 mt-5 mb-11 bg-white h-20">
      <div className="items-center md:flex hidden">
        <Image
          src={logo}
          alt="SweetSpot Logo"
          priority
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
      <div className="items-center md:hidden flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Image
                  src={logo}
                  alt="SweetSpot Logo"
                  priority
                  style={{ height: "35px", width: "200px" }}
                  className="mx-2 cursor-pointer"
                  onClick={() => router.push("/")}
                ></Image>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-[250px] font-semibold text-center text-[#4f46e5] hover:cursor-pointer">
                <p
                  className="hover:bg-slate-50 py-1"
                  onClick={() => router.push("/")}
                >
                  Home
                </p>
                <p
                  className="hover:bg-slate-50 py-1"
                  onClick={() => router.push("/key-finder")}
                >
                  Key Finder
                </p>
                <p
                  className="hover:bg-slate-50 py-1"
                  onClick={() => router.push("/manage-members")}
                >
                  Manage Members
                </p>
                <p
                  className="hover:bg-slate-50 py-1"
                  onClick={() => router.push("/login")}
                >
                  Log In
                </p>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
