"use client";

import React from "react";
import AuthLayout from "../layout/AuthLayout";
import { Card, Flex, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";
import OtpForm from "./Form";
import { useQuery, gql } from "@apollo/client";
const Otp = () => {
  const { Title, Paragraph, Text } = Typography;

  return (
    <AuthLayout>
      <Flex style={{ width: "100%" }} justify="center" align="center">
        <Flex vertical style={{ width: "90%" }}>
          <Flex vertical>
            <Title level={2}>Check your email</Title>
            <Text>
              Please enter the 4-digit verification code sent to your email
              address
            </Text>
          </Flex>
          <Flex style={{ width: "100%", marginTop: "1rem" }}>
            <OtpForm />
          </Flex>

          <Flex style={{ width: "100%", marginTop: "1rem" }}>
            <Text>
              Go back <Link href="/login">Login</Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </AuthLayout>
  );
};

export default Otp;
