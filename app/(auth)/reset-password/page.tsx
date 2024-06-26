import Image from "next/image";
import resetPassImg from "../../../public/reset-pass.jpg";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ResetPasswordForm } from "./_components/ResetPassWordForm";
import { Suspense } from "react";
import Loading from "@/components/shared/simple/Loading";

export default function ResetPassword() {
  return (
    <section className="h-screen relative">
      <div className="h-2/5 bg-blue-600"></div>
      <div className="absolute inset-0 flex items-center justify-center -top-1/6">
        <div className="max-w-xl w-full p-8 bg-gray-50 rounded-md shadow-sm text-center space-y-4">
          <Image
            src={resetPassImg}
            alt="logo"
            width={125}
            height={125}
            className="mx-auto"
          />
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-sm">Enter a new password for your account.</p>
          <Suspense fallback={<Loading />}>
            <ResetPasswordForm />
          </Suspense>
          <div>
            <Link
              href="/sign-in"
              className="text-sm flex justify-center items-center"
            >
              <ChevronLeft strokeWidth={1.5} />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
