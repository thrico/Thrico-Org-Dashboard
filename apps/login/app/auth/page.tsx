"use client";

import React from "react";
import { useTokenStore } from "@repo/ui/store";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
const Auth = () => {
  const searchParams = useSearchParams();
  const { token } = useTokenStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    token: state.token,
  }));
  const path = searchParams.get("path");
  const host = searchParams.get("host");
  const router = useRouter();

  React.useEffect(() => {
    if (token !== null) {
      router.push(`${host}/auth/callback?code=${token}&path=${path}`);
    } else {
      router.push(`http://localhost:20241/login/?path=${path}&&host=${host}`);
    }
  }, [token, path]);

  return <div>{}</div>;
};

export default Auth;
