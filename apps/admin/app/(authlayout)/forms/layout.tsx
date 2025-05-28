"use client";
import * as React from "react";
import { Card, TabsProps } from "antd";

import { UnorderedListOutlined } from "@ant-design/icons";
import MenuItemsLayout from "../../../screen/comman/MenuItemsLayout";

import { FaWpforms } from "react-icons/fa6";
function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "feedback",
      label: "Feedback",
      icon: <FaWpforms />,
    },
    {
      key: "polls",
      label: "Polls",
      icon: <UnorderedListOutlined />,
    },
  ];

  return (
    <>
      <MenuItemsLayout active={"forms"} items={items}>
        <Card>{children}</Card>
      </MenuItemsLayout>
    </>
  );
}

export default RootLayout;
