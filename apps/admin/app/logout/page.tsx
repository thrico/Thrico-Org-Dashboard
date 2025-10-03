"use client";
import React, { useEffect } from "react";

const page = () => {
  console.log(process.env);
  useEffect(() => {
    window.location.href = "http://accounts.thrico.com/logout";
  }, []);
  return null;
};

export default page;
