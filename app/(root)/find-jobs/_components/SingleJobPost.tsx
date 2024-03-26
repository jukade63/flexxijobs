import React from "react";
import Header from "./Header";
import JobPostDetail from "./JobPostDetail";
import BusinessProfile from "./BusinessProfile";
import { revalidateTag } from "next/cache";
import { getJobPostById } from "@/actions/job-post";

export default async function SingleJobPost({ id }: { id: string }) {
  revalidateTag("jobById");
  const jobPost: JobPost = await getJobPostById(+id);
  
  return (
    <div className="flex flex-col h-screen" >
      <div className="h-2/5 bg-sky-400 px-5 flex">
        <div className="w-3/4">
          <Header jobPost={jobPost} />
        </div>
        <div className="w-1/4 hidden md:flex place-items-center">
          <BusinessProfile profile={jobPost.business as Business} />
        </div>
      </div>
      <JobPostDetail jobPost={jobPost} />
      <h1 className=" font-semibold text-gray-600 md:hidden p-2">About the business</h1>
      <div className="md:hidden bg-slate-400">
        <BusinessProfile profile={jobPost.business as Business} />
      </div>
    </div>
  );
}
