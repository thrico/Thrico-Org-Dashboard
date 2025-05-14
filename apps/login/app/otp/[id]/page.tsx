import React, { Suspense } from "react";

import { Metadata } from "next";

import Otp from "../../../screen/Auth/otp/Otp";
export const metadata: Metadata = {
  title: "SignUp - Thrico",
  description: "",
};
const page = () => {
  return <Otp />;
};

export default page;
