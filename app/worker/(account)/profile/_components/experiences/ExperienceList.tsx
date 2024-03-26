import { getProfileData } from "@/actions/worker-profile";
import { formatDateTimeRange } from "@/lib/util-fns/format-datetime";
import EditProfile from "../EditProfileData";
import DeleteProfile from "../DeleteProfileData";

export default async function ExperienceList() {
  const experiences: Experience[] = await getProfileData("experiences");

  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {experiences.length > 0 &&
        experiences.map((exp) => (
          <li
            key={exp.id}
            className="border rounded-lg py-2 px-4 bg-gray-200 space-y-2  relative"
          >
            <div className="font-bold text-lg">{exp.position}</div>
            <p className="font-semibold">Description</p>
            <div className="text-sm">{exp.description}</div>
            <p className="font-semibold">Employer</p>
            <div className="text-sm">{exp.company}</div>
            <p className="font-semibold">Duration</p>
            <div className="text-sm">
              {formatDateTimeRange(exp.startDate, exp.endDate)}
            </div>
            <div className="absolute bottom-2 right-16 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-300 duration-200">
              <EditProfile section="experiences" data={exp} />
            </div>
            <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-300 duration-200">
              <DeleteProfile section="experiences" data={exp} />
            </div>
          </li>
        ))}
    </ul>
  );
}
