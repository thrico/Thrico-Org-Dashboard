import {
  AppstoreOutlined,
  EditOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Layout, Tabs, TabsProps } from "antd";

import React from "react";
import MainBreadcrumb from "./BreadCrumb";
import { usePathname, useRouter } from "next/navigation";
import { TbLogs } from "react-icons/tb";
import { Content } from "antd/lib/layout/layout";

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
    if (key === "dashboard") router.push(`/${active}`);
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
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "24px" }}>
          <Tabs
            defaultActiveKey={activeTab}
            items={menuitems}
            onChange={onChange}
          />
          {children}
        </Content>
      </Layout>
    </>
  );
};

export default MenuItemsLayout;
