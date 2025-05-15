"use client";
import * as React from "react";
import { Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import MainBreadcrumb from "../../../screen/comman/BreadCrumb";
import { MdDashboard } from "react-icons/md";

import { RiEditCircleFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

import { FcFeedback } from "react-icons/fc";
import { FaListOl, FaRegCheckCircle } from "react-icons/fa";
import IconView from "../../../screen/comman/IconView";
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
  ToolOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import MenuItemsLayout from "../../../screen/comman/MenuItemsLayout";
function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "All User",
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

  return (
    <>
      <MenuItemsLayout active={"user"} items={items}>
        {children}
      </MenuItemsLayout>
    </>
  );
}

export default RootLayout;
