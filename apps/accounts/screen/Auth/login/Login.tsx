"use client";

import React from "react";
import AuthLayout from "../layout/AuthLayout";
import { Card, Flex, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./Form";
import { useQuery, gql } from "@apollo/client";
const Login = () => {
  const { Title, Paragraph, Text } = Typography;

  return (
    <AuthLayout>
      <Flex style={{ width: "100%" }} justify="center" align="center">
        <Flex vertical style={{ width: "90%" }}>
          <Flex vertical>
            <Title level={2}>Log In</Title>
            <Text>Continue to Alumni Thrive</Text>
          </Flex>
          <Flex style={{ width: "100%", marginTop: "1rem" }}>
            <LoginForm />
          </Flex>

          <Flex style={{ width: "100%", marginTop: "1rem" }}>
            <Text>
              New to Alumni Thrive
              <Link href="/sign-up"> Get Started</Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </AuthLayout>
  );
};

export default Login;
