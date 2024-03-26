import { getJobPostByIdByBusiness } from "@/actions/job-post";
import EditJobPost from "@/app/(root)/business/(main)/post-job/_components/EditJobPost";

export default async function page({ params }: { params: { id: string } }) {
  let jobPost
  if(params.id){
    jobPost = await getJobPostByIdByBusiness(+params.id);
  }

  return (
    <div>
      <p>Job Post</p>
      <EditJobPost jobPost={jobPost}/>
    </div>
  );
}
