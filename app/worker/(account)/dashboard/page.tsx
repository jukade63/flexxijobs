import { getCompletedJobs } from "@/actions/job";
import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import("@/app/worker/(account)/dashboard/_components/Dashboard"), {
  ssr: false,
});
import React from "react";

export default async function page() {
  const jobs: Job[] = await getCompletedJobs();
  const data = jobs.map((job) => ({
    monthYear: new Date(job.jobPost.endDate).toLocaleString("default", {
      month: "short",
      year: "2-digit",
    }),
    earning: job.jobPost.paymentAmount,
    completed: job.completed,
  }));
  return (
    <>
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <Dashboard data={data} />
    </>
  );
}
