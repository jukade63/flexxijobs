import React, { Suspense } from "react";
import JobList from "@/app/(root)/find-jobs/_components/JobList";
import JobPageHero from "@/app/(root)/find-jobs/_components/JopPageHero";
import Pagination from "@/components/shared/simple/Pagination";
import Skeleton from "@/components/shared/simple/Skeleton";
import { randomUUID } from "crypto";
import JobSearch from "@/app/(root)/find-jobs/_components/JobSearch";

async function WorkerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <section key={randomUUID()}>
      <JobPageHero />
      <JobSearch />
      <div className="flex justify-center">
        <Pagination searchParams={searchParams} />
      </div>
      <Suspense fallback={<Skeleton/>}>
        <JobList searchParams={searchParams}/>
      </Suspense>
    </section>
  );
}

export default WorkerPage;
