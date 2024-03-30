"use client";

import { useTransition } from "react";
import { Button } from "../../../../../../components/ui/button";
import { addToFavorites } from "@/actions/job";
import { useToast } from "@/components/ui/use-toast";

export default function AddToFavoriteButton({
  jobId,
}: {
  jobId: number | undefined;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const handleAddToFavorite = async () => {
    if (jobId) {
      const result = await addToFavorites(jobId);
      if (result?.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "error",
        });
      } else {
        toast({
          title: "Success",
          description: "Added to favorites",
          variant: "success",
        });
      }
    }
  };
  return (
    <form action={() => startTransition(handleAddToFavorite)}>
      <Button
        variant="outline"
        className="max-w-[200px] mt-auto mb-2 text-white border-2 border-white"
        disabled={isPending}
      >
        {isPending ? "PROCESSING..." : "ADD TO FAVORITES"}
      </Button>
    </form>
  );
}
