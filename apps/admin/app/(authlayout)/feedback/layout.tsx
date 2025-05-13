"use client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}

import { useState } from "react";
import { Layout, Menu, Button, theme, Avatar, Card } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainBreadcrumb from "../../../screen/comman/BreadCrumb";

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedKeys = [
    pathname === "/feedback" ? "1" : "",
    pathname === "/feedback/forms" || pathname.startsWith("/forms/") ? "2" : "",
    pathname === "/feedback/results" || pathname.startsWith("/results/")
      ? "3"
      : "",
    pathname === "/feedback/settings" ? "4" : "",
    pathname === "/feedback/terms" ? "5" : "",
  ].filter(Boolean);

  return (
    <>
      <MainBreadcrumb />
      <Card extra="">
        <Menu
          mode="horizontal"
          selectedKeys={selectedKeys}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: <Link href="/feedback">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <FileTextOutlined />,
              label: <Link href="/feedback/forms">Forms</Link>,
            },
            {
              key: "3",
              icon: <BarChartOutlined />,
              label: <Link href="/feedback/results">Results</Link>,
            },
            {
              key: "4",
              icon: <SettingOutlined />,
              label: <Link href="/feedback/settings">Settings</Link>,
            },
            {
              key: "5",
              icon: <QuestionCircleOutlined />,
              label: <Link href="/feedback/terms">Terms & Conditions</Link>,
            },
          ]}
        />

        {children}
      </Card>
    </>
  );
};
