"use client";
import * as React from "react";
import { Button, Card, Tabs, TabsProps } from "antd";

import {
  AppstoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FlagOutlined,
  PauseCircleFilled,
  PauseCircleOutlined,
  StopOutlined,
  ToolOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import Stats from "../../../../screen/user/Stats";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "All",
      icon: <UnorderedListOutlined />,
    },

    {
      key: "approved",
      label: "Approved",
      icon: <CheckCircleOutlined />,
    },

    {
      key: "pending",
      label: "Pending",
      icon: <ClockCircleOutlined />,
    },
    {
      key: "disabled",
      label: "Disabled",
      icon: <PauseCircleOutlined />,
    },

    {
      key: "rejected",
      label: "Rejected",
      icon: <CloseCircleOutlined />,
    },
    {
      key: "flagged",
      label: "Flagged",
      icon: <FlagOutlined />,
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
      <Stats />
      <Tabs defaultActiveKey={activeTab} items={items} onChange={onChange} />
      {children}
    </>
  );
}

export default RootLayout;
