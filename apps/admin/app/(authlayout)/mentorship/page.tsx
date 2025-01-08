"use client";

import React from "react";
import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("../../../screen/mentorship/dashboard/Dashboard"),
  { ssr: false }
);

const page = () => {
  return <Dashboard />;
};

export default page;
