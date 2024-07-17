"use client";

import { useTokenStore } from "@repo/ui/store";
import React from "react";

import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
const Auth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token: any = searchParams.get("code");
  const path: any = searchParams.get("path");
  const storeToken = useTokenStore((state) => state.storeToken);

  React.useEffect(() => {
    storeToken(token?.replaceAll(" ", "+"));
    router.push(path ? path : "/");
  }, [token, path]);

  return null;
};

export default Auth;
