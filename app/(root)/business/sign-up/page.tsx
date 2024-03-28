import { SignUpForm } from "@/app/(root)/business/sign-up/_component.ts/SignUpForm";
import { getSession } from "@/lib/util-fns/get-session";
import { redirect } from "next/navigation";
import React from "react";

async function SignUp() {
  const session = await getSession();
  if (session && session.user.userType === "business") redirect("/business/post-job");
  return (
    <div className="flex flex-col items-center w-full space-y-4">
      <h1 className="text-2xl font-bold">Register to create job posts</h1>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
