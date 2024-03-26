import React from "react";
import ApplicationList from "./_components/ApplicationList";

export default async function page() {
  return (
    <>
      <h1 className="font-bold text-2xl">Applied Jobs</h1>
      <ApplicationList/>
    </>
  );
}
