import {
  AppstoreOutlined,
  EditOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Tabs, TabsProps } from "antd";

import React from "react";
import MainBreadcrumb from "./BreadCrumb";
import { usePathname, useRouter } from "next/navigation";
import { TbLogs } from "react-icons/tb";

const MenuItemsLayout = ({
  children,
  items,
  active,
}: {
  children: React.ReactNode;
  items: TabsProps["items"];
  active: string;
}) => {
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "dashboard") router.push(`/user`);
    else router.push(`/${active}/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace(`/${active}/`, "");

  const menuitems: TabsProps["items"] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <AppstoreOutlined />,
    },
    ...items,

    {
      key: "customization",
      label: "Customization",
      icon: <EditOutlined />,
    },

    {
      key: "reports",
      label: "Reports",
      icon: <WarningOutlined />,
    },
    {
      key: "audit-log",
      label: "Audit Log",
      icon: <UnorderedListOutlined />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <ToolOutlined />,
    },
  ];
  return (
    <>
      <MainBreadcrumb />
      <Card extra="">
        <Tabs
          defaultActiveKey={activeTab}
          items={menuitems}
          onChange={onChange}
        />
        {children}
      </Card>
    </>
  );
};

export default MenuItemsLayout;
