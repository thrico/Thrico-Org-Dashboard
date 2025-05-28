"use client";
import * as React from "react";
import { Button, Card, Tabs, TabsProps } from "antd";

import { CheckCircleOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

import NewPoll from "../../../../components/polls/NewPoll";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "All",
      icon: <UnorderedListOutlined />,
    },

    {
      key: "admin",
      label: "By admin",
      icon: <CheckCircleOutlined />,
    },
    {
      key: "user",
      label: "By user",
      icon: <CheckCircleOutlined />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "all") router.push(`/forms/polls/`);
    else router.push(`/forms/polls/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/forms/polls/", "");

  return (
    <>
      <Tabs
        tabBarExtraContent={<NewPoll />}
        defaultActiveKey={activeTab}
        items={items}
        onChange={onChange}
      />
      {children}
    </>
  );
}

export default RootLayout;
