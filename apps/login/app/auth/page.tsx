"use client";

import React from "react";
import { useTokenStore } from "@thrico/ui/store";
import { redirect, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useLazyQuery } from "@apollo/client";
import { getCheckUser } from "../../components/graphql/actions";
const Auth = () => {
  const searchParams = useSearchParams();
  const { token } = useTokenStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    token: state.token,
  }));
  const path = searchParams.get("path");
  const host = searchParams.get("host");
  const router = useRouter();

  const [search, { data }] = getCheckUser();

  React.useEffect(() => {
    if (token !== null) {
      search();
      // router.push(`${host}/auth/callback?code=${token}&path=${path}`);
    } else {
      window.location.href = `/login/?path=${path}&&host=${host}`;
    }
  }, [token, path]);

  return <div>{process.env.NEXT_PUBLIC_ACCOUNTS_URL}</div>;
};

export default Auth;
