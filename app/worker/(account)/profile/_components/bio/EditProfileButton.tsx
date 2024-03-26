'use client'

import { useModal } from "@/hooks/useModalStore";
import { SquarePen } from "lucide-react";
import { Session } from "next-auth";

export default function EditProfileButton({ session }: { session: Session }) {
  const { onOpen } = useModal();

  return (
    <button onClick={() => onOpen("editProfile", { session })}>
      <SquarePen color="white" size={18} className="inline" />
    </button>
  );
}
