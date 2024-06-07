"use client";
import {
  DeploymentUnitOutlined,
  HeartTwoTone,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SettingOutlined,
  SlidersOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

import "antd/dist/reset.css";

const { Sider, Content, Footer } = Layout;

import { Typography } from "antd";
import NavLink from "../nav-link";
import withAuth from "../../utils/withAuth";
import { HeaderComponent } from "../../components/header";
import { getGetUser } from "../../graphql/actions";
import { useState } from "react";

const { Link } = Typography;

function RootLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { data: { getUser } = {}, loading, error } = getGetUser();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <html>
      <head />
      <body>
        <Layout>
          <Sider
            style={{ position: "sticky", height: "100vh", top: 0 }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined style={{ color: "white" }} />
                ) : (
                  <MenuFoldOutlined style={{ color: "white" }} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <HomeOutlined />,
                  label: <NavLink href="/">Home Page</NavLink>,

                  children: [
                    {
                      key: "/home/carousel",
                      type: "group",
                      label: (
                        <Link href={"/home/carousel"}>
                          <Typography style={{ color: "white" }}>
                            Carousel
                          </Typography>
                        </Link>
                      ),
                    },
                  ],
                },

                {
                  key: "5",
                  icon: <SettingOutlined />,
                  label: <NavLink href="/settings">Settings</NavLink>,
                },

                {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: <NavLink href="/logout">Logout</NavLink>,
                },
              ]}
            />
          </Sider>
          <Layout>
            <HeaderComponent />
            <Content>{children}</Content>
            <Footer style={{ textAlign: "center" }}>
              ©{new Date().getFullYear()} | Thrico - The Modern Community
              Management Platform by PulsePlay Digital | All Rights Reserved
            </Footer>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}

export default withAuth(RootLayout);
