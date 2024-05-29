import React, { Suspense } from "react";

import { Metadata } from "next";
import Login from "../screen/Auth/login/Login";
import User from "../screen/Auth/User/User";
export const metadata: Metadata = {
  title: "Welcome - Thrico",
  description: "",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon.ico",
    },
  ],
};
const page = () => {
  return <User />;
};

export default page;
