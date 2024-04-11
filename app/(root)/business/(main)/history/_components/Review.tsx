import { getRating } from "@/actions/rating";
import React from "react";
import ReviewButton from "./ReviewButton";
import StarRating from "./StarRating";

export default async function Review({
  workerId,
  jobId,
}: {
  workerId: number;
  jobId: number;
}) {
  const review = await getRating(workerId, jobId);


  return (
    <>
      {review.error ? (
        <ReviewButton workerId={workerId} jobId={jobId} />
      ) : (
        <div className="flex flex-col md:flex-row gap-2">
          <p>{review.content}</p>
          <StarRating initialValue={review.value} size={4} />
        </div>
      )}
    </>
  );
}
