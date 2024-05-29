"use client";

import React from "react";
import AuthLayout from "../layout/AuthLayout";
import { Card, Flex, Spin, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useTokenStore } from "../../../components/store/store";
import Details from "./Details";
import { getUser, userProfile } from "../../../components/graphql/actions";
import { useRouter } from "next/navigation";

const User = () => {
  const router = useRouter();
  const { Title, Paragraph, Text } = Typography;

  const removeToken = useTokenStore((state) => state.removeToken);
  const { data, error } = getUser();
  const { data: profile, loading } = userProfile();
  if (error) {
    removeToken();
    router.push("/login");
  }
  return (
    <>
      <AuthLayout>
        <Flex style={{ width: "100%" }} justify="center" align="center">
          <Flex vertical style={{ width: "95%" }}>
            <Image
              alt="Thrico Logo"
              width={100}
              style={{ objectFit: "contain" }}
              height={100}
              src="/thrico_logo.png"
            />
            <Flex vertical>
              <Title level={2}>
                Welcome, {profile?.userProfile.firstName}{" "}
              </Title>
              <Flex
                style={{ width: "100%", marginTop: "1rem" }}
                justify="center"
              >
                {!loading ? (
                  <Details />
                ) : (
                  <Spin>
                    <Card style={{ height: "10rem" }}></Card>
                  </Spin>
                )}
              </Flex>
              {/* <Text>One last step before starting your free trial.</Text> */}
            </Flex>
          </Flex>
        </Flex>
      </AuthLayout>
    </>
  );
};

export default User;
