import { activateAccount } from "@/actions/auth";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import verifiedImg from "../../../public/verified.png";

export default async function ActivationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { token } = searchParams;

  const result = await activateAccount(token as string);
  
  return (
    <section className="h-screen relative">
      <div className="h-2/5 bg-blue-600"></div>
      <div className="absolute inset-0 flex items-center justify-center -top-1/6">
        <div className="max-w-xl w-full p-8 bg-white rounded-md shadow-md text-center space-y-4">
          {result.message === "success" && (
            <Image
              src={verifiedImg}
              alt="Activation Image"
              width={125}
              height={125}
              className="mx-auto"
            />
          )}
          <h1 className="text-2xl font-bold">Account Activation</h1>
          {result.status === "error" ? (
            <p className="text-lg font-bold text-red-600">{result.error}</p>

          ) : (
            <p className="text-lg font-bold text-green-700">
              {result.message}
            </p>
          )}
          <div className="inline-block">
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
