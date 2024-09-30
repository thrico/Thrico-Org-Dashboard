"use client";

import { usePathname } from "next/navigation";
import { Redirect } from "../redirect/Redirect";
import { getGetUser } from "../graphql/actions";

export default (WrappedComponent: any, options = { ssr: false }) => {
  function WithAuth(props: any) {
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
            to={`${process.env.NEXT_PUBLIC_ACCOUNTS_URL}/auth?path=${process.env.NEXT_PUBLIC_DASHBOARD_URL}${pathname}&&host=${process.env.NEXT_PUBLIC_DASHBOARD_URL}`}
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
