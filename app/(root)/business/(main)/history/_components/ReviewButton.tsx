"use client";
import { useModal } from "@/hooks/useModalStore";
import React from "react";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "./ReviewForm";
import { getRating } from "@/actions/rating";

export default function ReviewButton({
  workerId,
  jobId,
}: {
  workerId: number;
  jobId: number;
}) {
  const { onOpen } = useModal();

  const handleClick = () => {
    onOpen("update", {
      update: {
        jsx: <ReviewForm workerId={workerId} jobId={jobId} />,
      },
    });
  };
  return <Button onClick={handleClick}>Leave a review</Button>;
}
