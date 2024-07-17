import React, { Suspense } from "react";

import { Metadata } from "next";
import Login from "../screen/Auth/login/Login";
import User from "../screen/Auth/User/User";
export const metadata: Metadata = {
  title: "Welcome - Thrico",
  description: "",
  
};
const page = () => {
  return <User />;
};

export default page;
