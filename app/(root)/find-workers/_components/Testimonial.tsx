'use client'
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import clogo from "../../../../public/clogo.svg"
import John from "../../../../public/Joe.jpg"
import Emily from "../../../../public/Emily.jpg"
import Michael from "../../../../public/Michael.jpg"
import Jane from "../../../../public/Jane.jpg"
import David from "../../../../public/David.jpg"
import Sarah from "../../../../public/Sarah.jpg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
  const [isClient, setIsClient] = React.useState(false)
 
  React.useEffect(() => {
    setIsClient(true)
  }, [])
  
  const testimonials = [
    {
      id: 1,
      author: "John Doe",
      company: "ABC Corp",
      text: "Flexxi Jobs helped us find the perfect candidates quickly and efficiently. The platform is user-friendly and highly effective.",
      photo: John
    },
    {
      id: 2,
      author: "Jane Smith",
      company: "XYZ Inc",
      text: "We've been using Flexxi Jobs for our hiring needs and have been extremely satisfied with the quality of candidates we've found.",
      photo: Jane
    },
    {
      id: 3,
      author: "Michael Johnson",
      company: "123 Solutions",
      text: "Flexxi Jobs's streamlined process and extensive candidate pool have saved us countless hours in our recruitment efforts. Highly recommended!",
      photo: Michael
    },
    {
      id: 4,
      author: "Emily Brown",
      company: "Tech Innovations",
      text: "Using Flexxi Jobs has been a game-changer for our hiring process. We've found top-notch talent that aligns perfectly with our company culture and values.",
      photo: Emily
    },
    {
      id: 5,
      author: "David Clark",
      company: "Global Enterprises",
      text: "Flexxi Jobs exceeded our expectations with its intuitive interface and robust features. It's been instrumental in our hiring success.",
      photo: David
    },
    {
      id: 6,
      author: "Sarah Johnson",
      company: "Future Tech",
      text: "We've tried other platforms before, but Flexxi Jobs stands out for its exceptional candidate quality and customer service.",
      photo: Sarah
    },
  ];
  return (
    <div className="text-center bg-slate-300 py-12">
      <h2 className="text-3xl font-semibold text-center mb-12">Testimonials</h2>
      <Carousel className="w-full mx-auto max-w-4xl mb-5">
        <CarouselContent>

          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <div className="bg-white">
                  <div className="flex flex-col justify-around p-2 text-center aspect-square">

                   <Image src={testimonial.photo} alt="company logo" width={100} height={100} className="mx-auto rounded-full" />
                    <p className=" text-gray-500 p-2 text-sm">
                      <span className="inline-block pe-2 [&>svg]:w-5">
                        <div className="w-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 448 512"
                          >
                            <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                          </svg>
                        </div>
                      </span>
                      {testimonial.text}
                    </p>
                    <div>
                      <p className="text-sm font-semibold">
                        {testimonial.author}
                      </p>
                      <p className="text-xs">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-200" />
        <CarouselNext className="bg-gray-200" />
      </Carousel>
    </div>
  );
}
