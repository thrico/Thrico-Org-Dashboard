import { Card, Flex, Typography } from "antd";

import React from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => (
  <Flex
    style={{
      backgroundImage: `url("https://cdn.thrico.network/l@3000x3000@1x.webp")`,
      backgroundPosition: "center",
      backgroundRepeat: "repeat",
      height: "100vh",
      width: "100vw",
    }}
    justify="center"
    align="center"
  >
    <Flex
      style={{
        backgroundImage: `url("./noiseBackground.avif")`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        height: "100vh",
        width: "100vw",
      }}
      justify="center"
      align="center"
    >
      <Card
        actions={[
          <Typography.Link
            target="_blank"
            href="https://thrico.com/privacy-policy/"
          >
            Help
          </Typography.Link>,
          <Typography.Link
            target="_blank"
            href="https://thrico.com/privacy-policy/"
          >
            Privacy
          </Typography.Link>,
          <Typography.Link
            target="_blank"
            href="https://thrico.com/privacy-policy/"
          >
            Terms
          </Typography.Link>,
        ]}
        bordered={false}
        style={{ width: 800 }}
      >
        {children}
      </Card>
    </Flex>
  </Flex>
);

export default AuthLayout;
