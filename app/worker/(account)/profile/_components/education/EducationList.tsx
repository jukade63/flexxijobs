import { getProfileData } from "@/actions/worker-profile";
import EducationRow from "@/app/worker/(account)/profile/_components/education/EducationRow";

export const EducationList = async () => {
  const education: Education[] = await getProfileData("education");

  return (
    <>
      <ul className="pl-6">
        {education.length > 0 ? (
          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="p-2 border">Institution</th>
                <th className="p-2 border">Degree</th>
                <th className="p-2 border">Major</th>
                <th className="p-2 border">Graduation Year</th>
                <th className="p-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {education.length > 0 &&
                education.map((edu: Education, index: number) => (
                  <EducationRow key={index} index={index} education={edu} />
                ))}
            </tbody>
          </table>
        ) : (
          <p>No education data available.</p>
        )}
      </ul>
      <div className="mt-2 w-full text-center"></div>
    </>
  );
};
