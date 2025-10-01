import {
  AppstoreOutlined,
  EditOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Layout, Tabs, TabsProps, theme, Typography } from "antd";

import React from "react";

import { usePathname, useRouter } from "next/navigation";

import { Content } from "antd/lib/layout/layout";

import Visit from "../../components/layout/Visit";

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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { Title } = Typography;

  return (
    <>
      {/* <MainBreadcrumb /> */}
      <div
        style={{
          width: "100%",
          height: 50,
          backgroundColor: colorBgContainer,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Title
          level={3}
          style={{
            color: "#000",
            fontWeight: 600,
            textTransform: "capitalize",
            paddingLeft: 24,
            paddingTop: 15,
          }}
        >
          {active.charAt(0).toUpperCase() + active.slice(1)} Admin
        </Title>
        <Visit />
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: colorBgContainer,
          position: "sticky",
          top: 50,
          zIndex: 10,
        }}
      >
        <Tabs
          title="Thrico Admin"
          defaultActiveKey={activeTab}
          items={menuitems}
          onChange={onChange}
          tabBarStyle={{
            paddingLeft: 24,
            backgroundColor: colorBgContainer,
          }}
        />
      </div>

      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "24px" }}>{children}</Content>
      </Layout>
    </>
  );
};

export default MenuItemsLayout;
