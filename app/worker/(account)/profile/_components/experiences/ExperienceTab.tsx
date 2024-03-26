import AddExperience from "@/app/worker/(account)/profile/_components/experiences/AddExperience";
import ExperienceList from "@/app/worker/(account)/profile/_components/experiences/ExperienceList";
import React from "react";

const Experience = async () => {
  return (
    <section className="space-y-4">
      <h2 className="font-semibold text-xl">
        <span role="img" className="mr-2">
          👔
        </span>
        Experiences
      </h2>
      <ExperienceList />
      <div className="flex justify-center">
        <AddExperience />
      </div>
    </section>
  );
};

export default Experience;
