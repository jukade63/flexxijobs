import Link from "next/link";
import React from "react";

export default function Skill({ skills }: { skills: Skill[] }) {
  return (

    <div className="space-y-2">
      <h2 className="text-2xl font-bold bg-sky-200 p-2">Skills</h2>
      <ol className="space-y-2 px-2 md:px-5">
        <div className="hidden md:grid md:grid-cols-4">
          <h2 className="font-semibold">Skill</h2>
          <h2 className="font-semibold">Level</h2>
          <h2 className="font-semibold">Certification</h2>
          <h2 className="font-semibold">Link</h2>
        </div>
        {skills.length > 0 &&
          skills.map((skill, index) => (
            <li
              key={skill.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-0"
            >
              <h2 className=" font-semibold">
                {index + 1}. {skill.skillName}
              </h2>
              <div>
                <p className="text-sm text-gray-500">
                  <span className="md:hidden mr-2 text-xs text-gray-500 bg-gray-200 rounded-full py-1 px-2">
                    Level
                  </span>
                  {skill.skillLevel}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  <span className="md:hidden mr-2 text-xs text-gray-500 bg-gray-200 rounded-full py-1 px-2">
                    Certification
                  </span>
                  {skill.certification}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 truncate ">
                  <span className="md:hidden mr-2 text-xs text-gray-500 bg-gray-200 rounded-full py-1 px-2">
                    Link
                  </span>
                  <Link
                    href={skill.certLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {skill.certLink}
                  </Link>
                </p>
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}
