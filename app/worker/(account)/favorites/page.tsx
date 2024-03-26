
import { getFavoutiteJobs } from "@/actions/job";
import FavoriteJobItem from "./_components/FavoriteJobItem";

export default async function page() {

  const favoriteJobs: Job[] = await getFavoutiteJobs()

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-2xl">Favourite Jobs</h1>
      {favoriteJobs?.map((job) => (
        <FavoriteJobItem key={job.id} job={job}/>
      ))}
      {favoriteJobs.length === 0 && <p className="text-center">Add some jobs to your favorites</p>}
    </div>
  );
}
