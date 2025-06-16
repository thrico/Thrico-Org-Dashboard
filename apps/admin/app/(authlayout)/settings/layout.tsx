"use client";
import React, { useState } from "react";
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
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CustomerServiceTwoTone,
} from "@ant-design/icons";

import Sider from "antd/es/layout/Sider";
import { Button, Drawer, Layout, Menu, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { FaFont } from "react-icons/fa";
import { MdOutlineViewModule } from "react-icons/md";
function SettingsLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { key: "/settings", icon: <HomeOutlined />, label: "General" },
    {
      key: "/settings/appearance",
      icon: <CustomerServiceTwoTone />,
      label: "appearance",
    },
    { key: "/settings/domains", icon: <LinkOutlined />, label: "Domains" },
    { key: "/settings/font", icon: <FaFont />, label: "Fonts" },
    { key: "/settings/plan", icon: <DollarOutlined />, label: "Plan" },
    {
      key: "/settings/modules",
      icon: <MdOutlineViewModule />,
      label: "Module",
    },
    {
      key: "/settings/billing",
      icon: <CreditCardOutlined />,
      label: "Billing",
    },
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

  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout style={{ height: "100%", width: "100%" }}>
      <Sider
        style={{ position: "sticky", top: 10 }}
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined size={40} />
              ) : (
                <MenuFoldOutlined size={40} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <Menu
          theme="light"
          onClick={onClick}
          mode="inline"
          selectedKeys={[pathName]}
          style={{ borderRight: 0 }}
          items={menuItems}
        />
      </Sider>

      <Layout
        style={{
          width: "80%",

          paddingLeft: 20,
        }}
      >
        {children}
      </Layout>
    </Layout>
  );
}

export default SettingsLayout;
