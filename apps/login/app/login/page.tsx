import React, { Suspense } from "react";

import { Metadata } from "next";
import Login from "../../screen/Auth/login/Login";
export const metadata: Metadata = {
  title: "Welcome - Thrico",
  description: "",
};
const page = () => {
  return <Login />;
};

export default page;
