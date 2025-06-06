"use client";
import * as React from "react";
import { Card, TabsProps } from "antd";

import { UnorderedListOutlined } from "@ant-design/icons";
import MenuItemsLayout from "../../../screen/comman/MenuItemsLayout";
import { BiCategory } from "react-icons/bi";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "All Listing",
      icon: <UnorderedListOutlined />,
    },
    // {
    //   key: "categories",
    //   label: "Categories",
    //   icon: <BiCategory size={18} />,
    // },
  ];

  return (
    <>
      <MenuItemsLayout active={"listing"} items={items}>
        <Card>{children}</Card>
      </MenuItemsLayout>
    </>
  );
}

export default RootLayout;
