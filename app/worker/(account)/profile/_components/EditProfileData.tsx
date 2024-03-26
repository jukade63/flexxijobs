"use client";
import { Button } from "@/components/ui/button";
import { AddEducationForm } from "./education/AddEducationForm";
import { AddExperienceForm } from "./experiences/AddExperienceForm";
import { AddSkillForm } from "./skills/AddSkillForm";
import { useModal } from "@/hooks/useModalStore";
import { PencilLine } from "lucide-react";

type EditProfileProps = {
  section: "education" | "experiences" | "skills";
  data: Education | Experience | Skill | undefined;
};

export default function EditProfileData({ section, data }: EditProfileProps) {
  const { onOpen } = useModal();
  let jsx: JSX.Element = <></>;
  switch (section) {
    case "education":
      jsx = <AddEducationForm data={data as Education} isEdit />;
      break;
    case "experiences":
      jsx = <AddExperienceForm data={data as Experience } isEdit/>;
      break;
    case "skills":
      jsx = <AddSkillForm data={data as Skill} isEdit/>;
      break;
    default:
      break;
  }

  const handleEditProfile = () => {
    onOpen("update", {
      update: {
        jsx: jsx,
      },
    });
  };
  return (
    <Button onClick={handleEditProfile} className="text-sm bg-transparent hover:bg-transparent">
      <PencilLine  size={18}/>
    </Button>
  );
}
