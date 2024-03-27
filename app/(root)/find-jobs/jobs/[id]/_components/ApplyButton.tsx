"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { applyJob } from "@/actions/application";
import { useToast } from "@/components/ui/use-toast";

export default function ApplyButton({
  jobPostId,
}: {
  jobPostId: number | undefined;
}) {
  const {toast} = useToast();
  const [isPending, startTransition] = useTransition();
  const handleApplyJob = async () => {
    if (jobPostId) {
        const result = await applyJob(jobPostId);
        if(result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "error",
          });
        }
    }
  };
  return (
    <form action={()=> startTransition(handleApplyJob)}>
      <Button className="max-w-[200px] mt-auto mb-2" disabled={isPending}>{isPending ? "PROCESSING..." : "APPLY FOR THIS JOB"}</Button>
    </form>
  );
}
