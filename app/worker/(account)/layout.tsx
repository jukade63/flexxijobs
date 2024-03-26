import { UserButton } from "@/components/shared/UserButton";
import MobileNav from "@/components/shared/MobileNav";
import Navbar from "@/components/worker/Navbar";
import Sidebar from "@/components/worker/Sidebar";
import WorkerMobileNav from "@/components/worker/WorkerMobileNav";
import { getSession } from "@/lib/util-fns/get-session";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  const sessionExpired = session && new Date() > new Date(session?.expires);

  if (sessionExpired) redirect("/sign-in");
  return (
    <div>
      <div className="md:hidden fixed top-3 right-2 z-50">
        <WorkerMobileNav />
      </div>
      <div className="h-full">
        <div className="hidden md:block w-[270px] fixed top-0 left-0">
          <Sidebar />
        </div>
        <div className="w-full md:w-3/4 md:ml-[270px] p-4">{children}</div>
      </div>
    </div>
  );
}
