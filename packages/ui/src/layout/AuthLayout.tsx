import { Card, Flex, Typography } from "antd";

import React from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => (
  <Flex
    style={{
      backgroundImage: `url("https://cdn.alumnithrive.com/loginbg.png")`,
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
        style={{ width: 650 }}
      >
        {children}
      </Card>
    </Flex>
  </Flex>
);

export default AuthLayout;
