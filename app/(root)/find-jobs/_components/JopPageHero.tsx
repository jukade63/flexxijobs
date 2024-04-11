import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../../../../components/ui/button";

const elements = [
  {
    title: "Browse Thousands of Casual Jobs – All in One Place!",
    icon: <Check size={30} color="#158917" />,
  },
  {
    title: "Work on Your Terms: Choose When and Where You Want to Work.",
    icon: <Check size={30} color="#158917" />,
  },
  {
    title: "Join Now for Free and Start Your Casual Job Journey!",
    icon: <Check size={30} color="#158917" />,
  }
]
export default function JobPageHero() {
  return (
    <div className="flex flex-col h-1/3 items-center max-w-6xl mx-auto">
      <div className="pt-5">
        <div className="flex items-center gap-2">
         {elements.map((element, index) => (
          <div key={index} className="flex items-center gap-2">
            {element.icon}
            <h1 className="font-semibold text-xl">
              {element.title}
            </h1>
          </div>
         ))}
        </div>
       
      </div>
      <Link href="worker/sign-up" className={`${buttonVariants()} mt-10`}>
        Sign up
      </Link>
    </div>
  );
}
