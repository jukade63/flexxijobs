import Loading from "@/components/shared/simple/Loading";
import { ActionTabs } from "@/app/(root)/business/(main)/job-posts/_components/Actiontabs";
import JobPostList from "@/app/(root)/business/(main)/job-posts/_components/JobPostList";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="mx-auto min-h-screen">
      <ActionTabs />
      <Suspense fallback={<Loading/>}>
        <JobPostList />
      </Suspense>
    </div>
  );
}
