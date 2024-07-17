import { Card, Flex } from "antd";
import Link from "next/link";
import React from "react";
import ThricoLogo from "@repo/ui/ThricoLogo";
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
          <Link target="_blank" href="https://thrico.com/privacy-policy/">
            Help
          </Link>,
          <Link target="_blank" href="https://thrico.com/privacy-policy/">
            Privacy
          </Link>,
          <Link target="_blank" href="https://thrico.com/privacy-policy/">
            Terms
          </Link>,
        ]}
        bordered={false}
        style={{ width: 550 }}
      >
        <Flex style={{ width: "100%" }} justify="center">
          <Flex vertical style={{ width: "95%", marginBottom: 20 }}>
            <ThricoLogo />
          </Flex>
        </Flex>
        {children}
      </Card>
    </Flex>
  </Flex>
);

export default AuthLayout;
