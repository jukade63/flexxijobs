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
import { experiencesSchema } from "@/lib/schemas/worker-profile";

import { Loader2 } from "lucide-react";
import { useModal } from "@/hooks/useModalStore";
import { addProfileData, updateProfileData } from "@/actions/worker-profile";

type AddExperienceFormProps = {
  data?: Experience;
  isEdit?: boolean;
};
export function AddExperienceForm({ data, isEdit }: AddExperienceFormProps) {
  const { onClose } = useModal();
  const form = useForm<z.infer<typeof experiencesSchema>>({
    resolver: zodResolver(experiencesSchema),
    defaultValues: {
      position: data?.position ?? "",
      description: data?.description ?? "",
      company: data?.company ?? "",
      startDate: new Date(data?.startDate ?? Date.now()),
      endDate: new Date(data?.endDate ?? Date.now()),
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof experiencesSchema>) => {
    console.log(values);
    
    try {
      isEdit
        ? await updateProfileData({
            section: "experiences",
            values: { ...values, id: data?.id } as Experience,
          })
        : await addProfileData({
            section: "experiences",
            values: values,
          });

      form.reset();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="space-y-4 py-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postion</FormLabel>
                  <FormControl>
                    <Input placeholder="name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start date</FormLabel>
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="PPP"
                      monthsShown={1}
                      showYearDropdown
                      scrollableYearDropdown
                      customInput={
                        <Input className="w-[150px] pl-3 text-left font-normal mt-2 bg-gray-50" />
                      }
                      className="w-[150px] pl-3 text-left font-normal mt-2 bg-gray-50"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End date</FormLabel>
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="PPP"
                      monthsShown={1}
                      showYearDropdown
                      scrollableYearDropdown
                      customInput={
                        <Input className="w-[150px] pl-3 text-left font-normal mt-2 bg-gray-50" />
                      }
                      className="w-[150px] pl-3 text-left font-normal mt-2 bg-gray-50"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button className="w-2/3 mx-auto flex mt-8">
            {isSubmitting ? <Loader2 /> : "Add"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
