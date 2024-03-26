import SingleJobPost from "@/app/(root)/find-jobs/_components/SingleJobPost";

export default function page({ params }: { params: { id: string } }) {
  return (
    <SingleJobPost id={params.id}/>
  )
}
