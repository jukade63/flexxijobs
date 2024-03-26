"use client";
import React, { useEffect, useState } from "react";
import EditProfileModal from "@/app/worker/(account)/profile/_components/bio/EditProfileModal";
import ConfirmModal from "@/components/shared/modal/ConfirmModal";
import UpdateDataModal from "@/components/shared/modal/UpdateDataModal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <EditProfileModal />
      <ConfirmModal/>
      <UpdateDataModal/>
    </>
  );
}
