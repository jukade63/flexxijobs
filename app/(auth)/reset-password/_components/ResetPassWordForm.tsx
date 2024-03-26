"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useTransition } from "react";
import ButtonLoading from "@/components/shared/simple/ButtonLoading";
import { EyeIcon, EyeOff, KeyRound, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { resetPassword } from "@/actions/resetPassword";
import { useSearchParams } from "next/navigation";

const FormSchema = z
  .object({
    password: z.string().min(1, { message: "Please enter your password" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  type FormFields = z.infer<typeof FormSchema>;

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [endIconPassword, setEndIconPassword] = useState("EyeOff");
  const [endIconConfirmPassword, setEndIconConfirmPassword] = useState("EyeOff")

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  }
    
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  }

  useEffect(() => {
    if (showPassword) {
      setEndIconPassword("EyeOff");
    } else {
      setEndIconPassword("EyeIcon");
    }
  }, [showPassword]);

  useEffect(() => {
    if (showConfirmPassword) {
      setEndIconConfirmPassword("EyeOff");
    } else {
      setEndIconConfirmPassword("EyeIcon");
    }
  }, [showConfirmPassword]);
  const form = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(values: FormFields) {
    startTransition(async () => {
      try {
        await resetPassword(values.password, token);
        toast({
          title: "Password reset",
          description: "Try logging in with your new password",
          variant: "success",
        });
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Failed to reset password",
            description: error.message,
            variant: "error",
          });
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
         <div className="relative text-left">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    startIcon={KeyRound}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {React.cloneElement(endIconPassword === "EyeOff" ? <EyeOff /> : <EyeIcon />, {
            size: "18",
            onClick: togglePasswordVisibility,
            className: "absolute right-2 bottom-2.5 cursor-pointer",
          })}
        </div>
        <div className="relative text-left">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password again</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    startIcon={KeyRound}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {React.cloneElement(endIconConfirmPassword === "EyeOff" ? <EyeOff /> : <EyeIcon />, {
            size: "18",
            onClick: toggleConfirmPasswordVisibility,
            className: "absolute right-2 bottom-2.5 cursor-pointer",
          })}
        </div>
        <div className="flex justify-center">
          {isPending ? (
            <ButtonLoading />
          ) : (
            <Button type="submit" disabled={isPending} className="w-1/2">
              Submit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
