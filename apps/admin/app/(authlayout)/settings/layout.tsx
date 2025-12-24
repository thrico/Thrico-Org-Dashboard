"use client";
import React, { useState } from "react";


import Sider from "antd/es/layout/Sider";
import { Button, Drawer, Layout, Menu, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

import {
  BanknoteArrowUpIcon,
  Bell,
  Earth,
  FileStack,
  HandCoins,
  Home,
  LanguagesIcon,
  ListTodo,
  Lock,
  PaintBucketIcon,
  Receipt,
  UserCheckIcon,
} from "lucide-react";

function SettingsLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { key: "/settings", icon: <Home size={16} />, label: "General" },
    {
      key: "/settings/appearance",
      icon: <PaintBucketIcon size={16} />,
      label: "Appearance",
    },
    { key: "/settings/domains", icon: <Earth size={16} />, label: "Domains" },

    {
      key: "/settings/plan",
      icon: <BanknoteArrowUpIcon size={16} />,
      label: "Plan",
    },
    {
      key: "/settings/modules",
      icon: <ListTodo size={16} />,
      label: "Module",
    },
    {
      key: "/settings/billing",
      icon: <Receipt size={16} />,
      label: "Billing",
    },
    {
      key: "users",
      icon: <UserCheckIcon size={16} />,
      label: "Users and permissions",
    },

    { key: "taxes", icon: <HandCoins size={16} />, label: "Taxes and duties" },
    { key: "notifications", icon: <Bell size={16} />, label: "Notifications" },
    { key: "languages", icon: <LanguagesIcon size={16} />, label: "Languages" },
    { key: "privacy", icon: <Lock size={16} />, label: "Customer privacy" },
    { key: "policies", icon: <FileStack size={16} />, label: "Policies" },
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
