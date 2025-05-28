"use client";
import * as React from "react";
import { Button, Card, Tabs, TabsProps } from "antd";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  OrderedListOutlined,
  PauseCircleOutlined,
  StopOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import Post from "../../../../components/discussion-forum/post/Post";
import Add from "../../../../components/discussion-forum/categories/Add";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "All",
      icon: <OrderedListOutlined />,
    },
    {
      key: "active",
      label: "Active",
      icon: <CheckCircleOutlined />,
    },

    {
      key: "in-active",
      label: "In Active",
      icon: <StopOutlined />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "all") router.push(`/discussion-forum/categories`);
    else router.push(`/discussion-forum/categories/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/discussion-forum/categories/", "");
  return (
    <>
      <Tabs
        tabBarExtraContent={<Add />}
        defaultActiveKey={activeTab}
        items={items}
        onChange={onChange}
      />
      {children}
    </>
  );
}

export default RootLayout;
