"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import AppLogo from "../shared/simple/AppLogo";
import { workerLinks } from "@/lib/constants";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-gray-300 shadow-md h-screen flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2 mb-5 h-full">
        <Link href="/" className="flex justify-center mb-4">
          <AppLogo width={100} height={80} />
        </Link>
        {workerLinks.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
              "flex gap-2 text-gray-600 font-semibold text-sm p-2 rounded-md",
              pathname.includes(link.href)
                ? "bg-blue-700 text-white transition-all duration-100"
                : ""
            )}
          >
            {/* style svg element */}
            {React.cloneElement(<link.icon />, {
              style: {
                stroke: pathname.includes(link.href) ? "#ffffff" : "#1f2937",
                transition: "stroke 0.2s",
              },
              size: "20",
            })}
            {link.text}
          </Link>
        ))}
        <div className="mt-auto mx-auto">
          <Button onClick={() => signOut({ callbackUrl: "/" })} className="flex gap-2 bg-gray-200 hover:bg-gray-300 hover:border-2 border-gray-600 text-gray-600 duration-100">
            <LogOut size={20} color="#1f2937"/> Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
