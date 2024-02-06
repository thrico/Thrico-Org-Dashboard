import React, { Suspense } from "react";

import { Metadata } from "next";

import SignUp from "../../screen/Auth/signup/SignUp";
export const metadata: Metadata = {
  title: "SignUp - Alumni Thrive",
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
      <SignUp />
    </Suspense>
  );
};

export default page;
