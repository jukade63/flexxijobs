import { getJobPostsByBusiness } from "@/actions/job-post";
import Review from "./_components/Review";

export default async function History() {
  const completedJobs: JobPost[] = await getJobPostsByBusiness();

  const filteredJobs = completedJobs.filter(
    (jobPost) => jobPost.job?.completed === true
  );
  return (
    <section className="space-y-2">
      <h1 className="text-xl font-semibold">Completed Jobs</h1>
      <ul className="space-y-2">
        {filteredJobs.length > 0 &&
          filteredJobs.map((jobPost) => (
            <li key={jobPost.id} className="bg-white p-3">
              <h2 className="text-lg font-semibold text-rose-700">{jobPost.title}</h2>
              {jobPost.applications  && jobPost.applications.length > 0 && <h2 className="font-semibold">Hired Workers</h2>}
              <ul className="pl-4 ">
                {jobPost.applications?.map((application, index) => (
                  <li className="list-decimal list-inside flex gap-x-8 flex-col md:flex-row " key={application.id}>
                    <p>{index + 1}. {application.worker?.user.username}</p>
                    <Review workerId={application.worker?.id as number} jobId={jobPost?.job?.id as number}/>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </section>
  );
}
