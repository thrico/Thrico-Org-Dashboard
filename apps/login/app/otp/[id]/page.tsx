import React, { Suspense } from "react";

import { Metadata } from "next";

import SignUp from "../../../screen/Auth/signup/SignUp";
import Otp from "../../../screen/Auth/otp/Otp";
export const metadata: Metadata = {
  title: "SignUp - Thrico",
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
  return <Otp />;
};

export default page;
