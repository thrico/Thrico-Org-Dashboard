"use client";
import * as React from "react";
import { Card, TabsProps } from "antd";

import { UnorderedListOutlined } from "@ant-design/icons";
import MenuItemsLayout from "../../../screen/comman/MenuItemsLayout";
import Stats from "../../../screen/user/Stats";
function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "Members",
      icon: <UnorderedListOutlined />,
    },
  ];

  return (
    <>
      <MenuItemsLayout active={"members"} items={items}>
        <Card>{children}</Card>
      </MenuItemsLayout>
    </>
  );
}

export default RootLayout;
