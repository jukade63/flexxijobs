import { getAllJobs } from "@/actions/job-post";
import JobCard from "@/app/(root)/find-jobs/_components/JobCard";

interface PaginationProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function JobList({ searchParams }: PaginationProps) {

  const { page, limit, location, category, jobType } = searchParams;

  const pageNumber = page ? parseInt(page) : 1;
  const limitNumber = limit ? parseInt(limit) : 5;
 

  const jobPosts: JobPost[] = await getAllJobs(
    pageNumber,
    limitNumber,
    location,
    category,
    jobType
  ) || [];

  return (
    <div className="max-w-3xl mx-auto space-y-2">
      {jobPosts.length > 0 && <h1
        className="text-lg font-semibold text-gray-600 px-4 py-2 
      rounded-md bg-slate-200 inline-block"
      >
        Available Jobs
      </h1>}
      {jobPosts.length > 0 && jobPosts.map((jobPost) => (
        <JobCard key={jobPost.id} jobPost={jobPost} />
      ))}
      {jobPosts.length === 0 && (
        <p className="text-center mt-10">No available jobPosts</p>
      )}
    </div>
  );
}
