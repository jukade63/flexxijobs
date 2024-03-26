import BasicInfo from "@/components/shared/BasicInfo";
import { ActionTabs } from "@/app/(root)/business/(main)/job-posts/_components/Actiontabs";
import { JobPostForm } from "@/app/(root)/business/(main)/post-job/_components/JobPostForm";

export default function page() {
  return (
    <section className="mx-auto">
      <ActionTabs />
      <JobPostForm />
    </section>
  );
}
