import { Flex, theme } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React from "react";

const Footer = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Flex
      style={{
        background: colorBgContainer,
        padding: 10,
        width: "100%",
        position: "fixed",

        display: "flex",
        paddingTop: 25,
        zIndex: 10,
        height: 50,
        bottom: 0,
      }}
      align="center"
      justify="space-between"
    >
      <Flex gap={10} style={{ alignItems: "center" }}>
        <Paragraph>Feedback</Paragraph>
        <Paragraph>Help</Paragraph>
      </Flex>
      <Flex gap={20}>
        <Paragraph>Privacy</Paragraph>

        <Paragraph>Terms</Paragraph>

        <Paragraph>
          ©{new Date().getFullYear()} | Thrico - The Modern Community
          Management Platform by PulsePlay Digital
        </Paragraph>
      </Flex>
    </Flex>
  );
};

export default Footer;
