import { Mail, Phone} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import placeholder from '../../../../public/fallback-img.png'

export default function BusinessProfile({
  profile,
}: {
  profile: Business;
}) {
const {user} = profile
  return (
    <div className="space-y-2 p-5 text-center">
      <div className="bg-gray-100 flex justify-center w-[110px] h-[110px] rounded-sm mx-auto ">
        <Image
          src={user?.imgUrl ?? placeholder}
          alt={user?.username || ""}
          width={100}
          height={100}
        />
      </div>
      <p className="text-xl text-gray-50 font-semibold">{user?.username}</p>
      <p className="text-gray-100 text-sm"><Mail color="white" size={18} className="inline-block"/> {user?.email}</p>
      <p className="text-gray-100 text-sm"><Phone color="white" size={18} className="inline-block"/> {user?.phoneNumber}</p>
      <Link href='#' className="text-xs text-gray-700 underline underline-offset-2">View website</Link>
    </div>
  );
}
