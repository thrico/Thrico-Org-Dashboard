import React, { Suspense } from "react";

import { Metadata } from "next";
import Login from "../screen/Auth/login/Login";
export const metadata: Metadata = {
  title: "Welcome - Alumni Thrive",
  description: "",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
};
const page = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default page;
