"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/logout?source=http://localhost:20243/");
  }, []);
  return <div>page</div>;
};

export default page;
