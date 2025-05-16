"use client";
import * as React from "react";
import { Card, Tabs, TabsProps } from "antd";

import {
  AppstoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
  ToolOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "All",
      icon: <UnorderedListOutlined />,
    },
    {
      key: "pending",
      label: "Pending",
      icon: <ClockCircleOutlined />,
    },

    {
      key: "approved",
      label: "Approved",
      icon: <CheckCircleOutlined />,
    },

    {
      key: "rejected",
      label: "Rejected",
      icon: <CloseCircleOutlined />,
    },
    {
      key: "blocked",
      label: "Blocked",
      icon: <StopOutlined />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "all") router.push(`/members/all`);
    else router.push(`/members/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/members/", "");
  return (
    <>
      <Tabs defaultActiveKey={activeTab} items={items} onChange={onChange} />
      {children}
    </>
  );
}

export default RootLayout;
