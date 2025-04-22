"use client";
import React from "react";
import {
  HomeOutlined,
  DollarOutlined,
  TeamOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
  CalculatorOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  BellOutlined,
  DatabaseOutlined,
  TranslationOutlined,
  LockOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import Sider from "antd/es/layout/Sider";
import { Layout, Menu, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { FaFont } from "react-icons/fa";
function SettingsLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { key: "general", icon: <HomeOutlined />, label: "General" },
    { key: "/settings/domains", icon: <LinkOutlined />, label: "Domains" },
    { key: "/settings/font", icon: <FaFont />, label: "Fonts" },
    { key: "plan", icon: <DollarOutlined />, label: "Plan" },
    { key: "billing", icon: <CreditCardOutlined />, label: "Billing" },
    { key: "users", icon: <TeamOutlined />, label: "Users and permissions" },
    { key: "payments", icon: <CreditCardOutlined />, label: "Payments" },
    { key: "checkout", icon: <ShoppingCartOutlined />, label: "Checkout" },

    { key: "taxes", icon: <CalculatorOutlined />, label: "Taxes and duties" },
    { key: "locations", icon: <EnvironmentOutlined />, label: "Locations" },
    { key: "markets", icon: <></>, label: "Markets" },

    { key: "notifications", icon: <BellOutlined />, label: "Notifications" },
    { key: "data", icon: <DatabaseOutlined />, label: "Custom data" },
    { key: "languages", icon: <TranslationOutlined />, label: "Languages" },
    { key: "privacy", icon: <LockOutlined />, label: "Customer privacy" },
    { key: "policies", icon: <FileTextOutlined />, label: "Policies" },
  ];

  const router = useRouter();
  const pathName = usePathname();
  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  return (
    <Layout style={{ minHeight: "100%", width: "100%" }}>
      <Sider theme="light" width={"20%"}>
        <div style={{ padding: "16px" }}></div>

        <Menu
          onClick={onClick}
          mode="inline"
          selectedKeys={[pathName]}
          style={{ borderRight: 0 }}
          items={menuItems}
        />

        <div
          style={{
            padding: "16px",
            position: "absolute",
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #f0f0f0",
          }}
        ></div>
      </Sider>

      <Layout style={{ width: "80%" }}>{children}</Layout>
    </Layout>
  );
}

export default SettingsLayout;
