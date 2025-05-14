"use client";

import { usePathname } from "next/navigation";
import { Redirect } from "../redirect/Redirect";
import { getGetUser } from "../graphql/actions";

export default (WrappedComponent: any, options = { ssr: false }) => {
  function WithAuth(props: any) {
    const ACCOUNTS_URL = process.env.ACCOUNTS_URL
      ? process.env.ACCOUNTS_URL
      : "https://accounts.thrico.com/login";
    const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL
      ? process.env.NEXT_PUBLIC_DASHBOARD_URL
      : "https://dashboard.thrico.com/";
    const pathname = usePathname();

    const { data: { getUser } = {}, loading, error } = getGetUser();

    if (loading) {
      return <></>;
    }
    if (!loading && (!getUser || error) && typeof window !== "undefined") {
      localStorage.removeItem("key");
      return (
        <>
          <Redirect
            to={`${ACCOUNTS_URL}/auth?path=${DASHBOARD_URL}${pathname}&&host=${process.env.DASHBOARD_URL}`}
          />
        </>
      );
    }

    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  }

  return WithAuth;
};
