"use client";
import * as React from "react";
import { TabsProps } from "antd";

import { UnorderedListOutlined } from "@ant-design/icons";
import MenuItemsLayout from "../../../screen/comman/MenuItemsLayout";
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
        {children}
      </MenuItemsLayout>
    </>
  );
}

export default RootLayout;
