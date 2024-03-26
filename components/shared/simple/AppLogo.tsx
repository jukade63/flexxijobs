import Image from "next/image";
import React from "react";

export default function AppLogo({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <div>
      <Image
        src="/logo2.png"
        className="object-cover rounded-full"
        alt="app-logo"
        width={width}
        height={height}
      />
    </div>
  );
}
