"use client";
import * as React from "react";
import { Button, Card, Tabs, TabsProps } from "antd";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  PauseCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import Post from "../../../../components/discussion-forum/post/Post";

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
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "all") router.push(`/discussion-forum/all`);
    else router.push(`/discussion-forum/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/discussion-forum/", "");
  return (
    <>
      <Tabs
        tabBarExtraContent={<Post />}
        defaultActiveKey={activeTab}
        items={items}
        onChange={onChange}
      />
      {children}
    </>
  );
}

export default RootLayout;
