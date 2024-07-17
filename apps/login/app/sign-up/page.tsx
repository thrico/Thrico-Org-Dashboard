import React, { Suspense } from "react";

import { Metadata } from "next";

import SignUp from "../../screen/Auth/signup/SignUp";
export const metadata: Metadata = {
  title: "SignUp - Thrico",
  description: "",

};
const page = () => {
  return <SignUp />;
};

export default page;
