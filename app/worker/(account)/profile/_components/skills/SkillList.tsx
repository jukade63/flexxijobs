import { getProfileData } from "@/actions/worker-profile";
import EditProfile from "../EditProfileData";
import DeleteProfile from "../DeleteProfileData";
import Link from "next/link";

export default async function SkillList() {
  const skills: Skill[] = await getProfileData("skills");

  return (
    <ul className="grid gap-4 grid-cols-1 lg:grid-cols-2 ">
      {skills.length > 0 &&
        skills.map((skill) => (
          <li
            key={skill.id}
            className="border rounded-lg pt-2 px-4 bg-gray-200 space-y-2 relative pb-14"
          >
            <div className="font-bold text-lg">{skill.skillName}</div>
            <p className="font-semibold">Skill level</p>
            <div className="text-sm">{skill.skillLevel}</div>
            <p className="font-semibold">Certification</p>
            <div className="text-sm">{skill.certification || "-"}</div>
            <p className="font-semibold">Certification link</p>
            <Link href={skill.certLink} target="_blank" >
              <p className="truncate text-sm">{skill.certLink}</p>
            </Link>
            <div className="absolute bottom-2 right-16 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-300 duration-200">
              <EditProfile section="skills" data={skill} />
            </div>
            <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-300 duration-200">
              <DeleteProfile section="skills" data={skill} />
            </div>
          </li>
        ))}
    </ul>
  );
}
