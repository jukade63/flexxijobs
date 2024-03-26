import { formatDateTimeRange } from "@/lib/util-fns/format-datetime";
import { format, formatDistance, formatDistanceToNow } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import React from "react";
import { Button } from "react-day-picker";
import CancelApplicationButton from "./CancelApplicationButton";

export default function ApplicationItem({
  application,
}: {
  application: Application;
  isInFavorites: boolean;
}) {
  const { jobPost, status } = application;
  const { business } = jobPost;

  const statusColor =
    status === "accepted"
      ? "bg-green-600"
      : status === "applied"
      ? "bg-orange-500"
      : "bg-red-400";

  return (
    <div className="rounded-md shadow-md bg-gradient-to-r from-rose-200 to-violet-200">
      <div className="p-2 space-y-2 ">
        <div className="flex justify-between items-center">
          <p className="text-sm text-amber-700">
            Applied{" "}
            <span className="ml-2 font-semibold underline underline-offset-2 decoration-[2px]">
              {formatDistanceToNow(new Date(application.appliedAt), {
                addSuffix: true,
              })}
            </span>
          </p>
          <p
            className={`text-sm rounded-full py-1 px-4 font-semibold text-gray-50 ${statusColor}`}
          >
            {application.status}
          </p>
        </div>
        <h2 className="text-lg font-semibold text-center">
          Job Position : {jobPost.title}
        </h2>
        <p className="text-sm truncate text-gray-500">{jobPost.description}</p>
        <p className="text-sm">
          <Calendar size={16} className="inline-block pb-1" />{" "}
          {formatDateTimeRange(jobPost.startDate, jobPost.endDate)}{" "}
          <span className="ml-2 bg-gray-200 px-2 py-1 rounded-md text-gray-500 text-xs">
            will expire in{" "}
            {formatDistance(new Date(jobPost.endDate), new Date(), {
              addSuffix: true,
            })}
          </span>
        </p>
        <p className="text-sm">
          <MapPin size={16} className="inline-block pb-1" />{" "}
          {jobPost.location.join(", ")}
        </p>
      </div>

      <div className="flex justify-between items-center relative">
        <div className="space-y-1 py-2 bg-gray-200 w-full px-2">
          <h3 className="text-md font-semibold">Posted By:</h3>
          <div className="flex gap-4 items-center">
            <p className="text-sm font-semibold">{business?.user.username}</p>
            <p className="text-xs ">email : {business?.user.email}</p>
            <p className="text-xs ">phone : {business?.user.phoneNumber}</p>
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          <CancelApplicationButton applicationId={application.id} />
        </div>
        {/* {isInFavorites && (
          <form action={removeFromFavorites.bind(null, application?.jobPost?.job?.id?.toString())}>
            <Button type="submit">Remove from Favorites</Button>
          </form>
        )} */}
      </div>
    </div>
  );
}
