"use client";

import React from "react";
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import { Avatar, Flex, Layout, Menu, Typography, theme } from "antd";
import Logo from "@repo/ui/Logo";
const { Header, Content, Footer, Sider } = Layout;
import { Button, Dropdown, message, Space, Tooltip } from "antd";
const items: MenuProps["items"] = [
  { title: "General", icon: UserOutlined },
  { title: "Settings", icon: SettingOutlined },
  { title: "Logout", icon: LogoutOutlined },
].map((t, index) => ({
  key: String(index + 1),
  icon: React.createElement(t.icon),
  label: t.title,
}));

const item: MenuProps["items"] = [
  {
    label: "1st menu item",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "2nd menu item",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "3rd menu item",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "4rd menu item",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];
const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info("Click on left button.");
  console.log("click left button", e);
};

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const { Title, Paragraph, Text } = Typography;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu
          style={{ marginTop: "5rem" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            overflow: "auto",
            width: "100%",
            position: "sticky",
            left: 0,
            display: "flex",
            justifyContent: "center",
            top: 0,
            bottom: 0,
          }}
        >
          <Flex
            style={{ width: "100%" }}
            justify="space-between"
            align="center"
          >
            <div style={{ margin: 20 }}>
              <Logo />
            </div>
            <div style={{ margin: 20 }}>
              <Dropdown menu={{ items }}>
                <Button style={{ height: "3rem" }} type="text">
                  <Avatar shape="square" style={{ backgroundColor: "#87d068" }}>
                    PV
                  </Avatar>
                  <Text style={{ marginLeft: "1rem" }}>Pankaj Verma</Text>
                </Button>
              </Dropdown>
            </div>
          </Flex>
        </Header>
        <Content
          style={{
            margin: "24px",
            marginLeft: 230,
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Alumni Thrive ©{new Date().getFullYear()}
        </Footer> */}
      </Layout>
    </Layout>
  );
}
