"use client";
import * as React from "react";
import { TabsProps } from "antd";

import { UnorderedListOutlined } from "@ant-design/icons";
import MenuItemsLayout from "../../../screen/comman/MenuItemsLayout";
import { MdOutlineFeed } from "react-icons/md";
function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "Feed",
      icon: <MdOutlineFeed />,
    },
  ];

  return (
    <>
      <MenuItemsLayout active={"feed"} items={items}>
        {children}
      </MenuItemsLayout>
    </>
  );
}

export default RootLayout;
