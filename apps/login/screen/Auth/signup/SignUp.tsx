"use client";

import React from "react";
import AuthLayout from "../layout/AuthLayout";
import { Card, Flex, Typography } from "antd";
import Link from "next/link";

import LoginForm from "./Form";

const SignUp = () => {
  const { Title, Paragraph, Text } = Typography;
  return (
    <AuthLayout>
      <Flex style={{ width: "100%" }} justify="center" align="center">
        <Flex vertical style={{ width: "95%" }}>
          <Flex vertical>
            <Title level={2}>Create a Thrico account</Title>
            <Text>One last step before starting your free trial.</Text>
          </Flex>
          <Flex style={{ width: "100%", marginTop: "1rem" }}>
            <LoginForm />
          </Flex>

          <Flex style={{ width: "100%", marginTop: "1rem" }}>
            <Text>
              Already have a Thrico account? <Link href="/">Login</Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </AuthLayout>
  );
};

export default SignUp;
