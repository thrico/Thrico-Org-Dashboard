"use client";

import { useTokenStore } from "@thrico/ui/store";
import React from "react";

import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
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
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  return (
    <div style={styles.container}>
      <Spin
        indicator={antIcon}
        tip={
          <div style={{ textAlign: "center" }}>
            <div>Just a moment,</div>
            <div>we're setting things up...</div>
          </div>
        }
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full screen
    flexDirection: "column" as const,
    backgroundColor: "#fff",
  },
};

export default Auth;
