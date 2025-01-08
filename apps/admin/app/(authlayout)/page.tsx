"use client";
import React from "react";
import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("../../components/dashboard/Dashboard"),
  { ssr: false }
);

function page() {
  return <Dashboard />;
}

export default page;
