import EditJobPost from "@/app/(root)/business/(main)/post-job/_components/EditJobPost";
import { getJobPostByIdByBusiness} from "@/lib/util-fns/get-session";

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
