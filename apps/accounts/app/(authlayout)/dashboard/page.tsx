import { Metadata } from "next";
import React, { Suspense } from "react";
import Dashboard from "../../../screen/dashboard/Dashboard";
export const metadata: Metadata = {
  title: "Account - Alumni Thrive",
  description: "",
  icons: {
    icon: "./favicon/favicon-16x16.png",
    shortcut: "./favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
    other: {
      rel: "./favicon/apple-touch-icon.png",
      url: "./favicon/apple-touch-icon.png",
    },
  },
};
const page = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};

export default page;
