"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useModal } from "@/hooks/useModalStore";
import { reviewSchema } from "@/lib/schemas/review-schema";
import { addRating } from "@/actions/rating";
import StarRating from "./StarRating";
import { Textarea } from "@/components/ui/textarea";

export type ReviewFormData = z.infer<typeof reviewSchema>;

export function ReviewForm({workerId, jobId}: {workerId: number, jobId: number}) {
  const { onClose } = useModal();
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      content: "",
      value: 0,
      jobId,
      workerId
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    
    await addRating({...values, value: +values.value});
    onClose();
  };

  return (
    <div className="space-y-4 py-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate this worker</FormLabel>
                  <FormControl>
                  <StarRating onChange={(value) => field.onChange(value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Write a review </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
          </div>
          <Button className="w-2/3 mx-auto flex mt-8">
            {isSubmitting ? <Loader2 /> : "Add"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
