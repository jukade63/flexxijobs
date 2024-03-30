import AddSkill from "@/app/worker/(account)/profile/_components/skills/AddSkill";
import SkillList from "@/app/worker/(account)/profile/_components/skills/SkillList";
import React from "react";

const Skills = () => {
  return (
    <section className="space-y-4">
      <h2 className="font-semibold text-xl">
        <span role="img" className="mr-2">
          🏅
        </span>
        Skills
      </h2>
        <SkillList />
      <div className="flex justify-center">
        <AddSkill />
      </div>
    </section>
  );
};

export default Skills;
