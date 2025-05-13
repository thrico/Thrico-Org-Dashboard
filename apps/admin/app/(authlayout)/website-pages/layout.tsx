"use client";
import React from "react";
import MainBreadcrumb from "../../../screen/comman/BreadCrumb";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainBreadcrumb />
      {children}
    </>
  );
}

export default Layout;
