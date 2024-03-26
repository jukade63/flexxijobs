"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { addProfileData, updateProfileData } from "@/actions/worker-profile";
import { useModal } from "@/hooks/useModalStore";
import { educationSchema } from "@/lib/schemas/worker-profile";

type AddEducationFormProps = {
  data?: Education;
  isEdit?: boolean;
};

export function AddEducationForm({ data, isEdit }: AddEducationFormProps) {
  const { onClose } = useModal();
  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: data?.institution ?? "",
      degree: data?.degree ?? "",
      gradDate: new Date(data?.gradDate ?? Date.now()),
      major: data?.major ?? "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof educationSchema>) => {
    try {
      isEdit
        ? await updateProfileData({
            section: "education",
            values: { ...values, id: data?.id } as Education,
          })
        : await addProfileData({
            section: "education",
            values: values,
          });

      form.reset();
      onClose();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute</FormLabel>
                  <FormControl>
                    <Input placeholder="name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Major</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gradDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Graduate year</FormLabel>
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
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving.." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
