import { getCompletedJobs } from "@/actions/job";
import { format } from "date-fns";
import {
    Building2,
    CalendarDays,
    CheckCircle,
    CircleDollarSign,
    Navigation,
  } from "lucide-react";

export default async function WorkHistoryList() {
  const completedJobs: Job[] = await getCompletedJobs();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
        {completedJobs.length > 0 && completedJobs.map((work, index) => {
          const {jobPost: {business}} = work
          return (
            <div key={index} className="mb-4 bg-sky-100 p-4 rounded shadow-sm">
              <h2 className="text-md font-semibold mb-2">
                {work.jobPost.title}
              </h2>
              <div className="grid grid-cols-9 items-center">
                <Building2 size={16} className="col-span-1" />
                <p className="text-gray-600 text-sm col-span-8">
                  {business?.user?.username}
                </p>
                <CalendarDays size={16} className="col-span-1" />
                <p className="text-gray-600 text-sm col-span-8">
                  {format(work.jobPost.startDate, "dd/MM/yyyy") } - {format(work.jobPost.endDate, "dd/MM/yyyy")}
                </p>
                <Navigation size={16} className="col-span-1" />
                <p className="text-gray-600 text-sm col-span-8">
                  {work.jobPost.location.join(", ")}
                </p>
                <CircleDollarSign size={16} className="col-span-1" />
                <p className="text-gray-600 text-sm col-span-8">
                  {work.jobPost.paymentAmount}
                </p>
                <CheckCircle size={16} className="col-span-1" />
                <p className="text-gray-600 text-sm col-span-8">
                  {work.completed ? "Completed" : "Not Completed"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
  )
}
