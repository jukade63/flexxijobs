import dynamic from 'next/dynamic'
 
const Testimonials = dynamic(() => import('@/app/(root)/find-workers/_components/Testimonial'), { ssr: false })
import Hero from "@/components/shared/Hero";
import HowItWork from "@/app/(root)/find-workers/_components/HowItWorks";
import React from "react";

function BusinessPage() {
  return (
    <div className="mt-1">
      <Hero />
      <HowItWork/>
      <Testimonials />
    </div>
  );
}

export default BusinessPage;
