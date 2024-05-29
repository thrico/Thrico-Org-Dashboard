"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("http://localhost:20241/logout?source=http://localhost:20243/");
  }, []);
  return <div>page</div>;
};

export default page;
