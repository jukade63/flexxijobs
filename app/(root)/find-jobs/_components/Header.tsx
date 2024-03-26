import React from "react";
import { Clock, Globe, MapPin, Wallet } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ApplyButton from "../jobs/[id]/_components/ApplyButton";
import AddToFavoriteButton from "../jobs/[id]/_components/AddToFavoriteButton";

type HeaderProps = {
  jobPost: JobPost;
};

export default function Header({ jobPost }: HeaderProps) {
  return (
    <div className="flex flex-col gap-2 p-3 md:w-3/5 h-full">
      <h1 className="text-2xl font-bold text-white">{jobPost.title}</h1>
      <p className="text-gray-100 text-sm">
        Industry :{" "}
        <span className="text-blue-700 text-semibold">{jobPost.business?.industry}</span>
      </p>
      <div className="flex flex-wrap gap-x-10">
        <div className="flex gap-2">
          <Globe color="white" size={18} />
          <div className="text-gray-100 text-sm mb-3">{jobPost.jobType}</div>
        </div>
        <div className="flex gap-2">
          <Wallet color="white" size={18} />
          <div className="text-gray-100 text-sm mb-3">{jobPost.paymentAmount}</div>
        </div>
        <div className="flex gap-2">
          <MapPin color="white" size={18} />
          <div className="text-gray-100 text-sm mb-3">{jobPost?.location.join(", ")}</div>
        </div>
        <div className="flex gap-2">
          <Clock color="white" size={18} />
          <div className="text-gray-100 text-sm mb-3">
            {formatDistanceToNow(new Date(jobPost.createdAt!), { addSuffix: true })}
          </div>
        </div>
      </div>
      <ApplyButton jobPostId={jobPost?.id}/>
      <AddToFavoriteButton jobId={jobPost?.job?.id} />
    </div>
  );
}
