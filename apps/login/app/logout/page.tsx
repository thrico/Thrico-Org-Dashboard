"use client";

import { SyncOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import React, { useEffect } from "react";
import { logoutUser } from "../../components/graphql/actions";
import toast from "react-hot-toast";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@thrico/ui/store";

const page = () => {
  const router = useRouter();

  const removeToken = useTokenStore((state) => state.removeToken);
  const [logout, { data, loading }] = logoutUser({
    onCompleted() {
      toast.success("Logout Success", {
        id: "12",
      });
      removeToken();
    },
  });
  useEffect(() => {
    logout();
    router.push("/login");
  }, []);

  return (
    <Flex
      style={{ width: "100%", height: "100vh" }}
      align="center"
      justify="center"
      vertical
    >
      <SyncOutlined style={{ fontSize: 40, marginBottom: 20 }} spin />
      <h2>Logging out... Please wait.</h2>
    </Flex>
  );
};

export default page;

// 1. Status Active/Inactive
// 2. Tags  3. CreatedBy 4. Created Date  5. Member range 5. Location
