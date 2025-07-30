import {
  AppstoreOutlined,
  EditOutlined,
  FileTextOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Layout, Tabs, TabsProps, theme, Typography } from "antd";

import React from "react";

import { usePathname, useRouter } from "next/navigation";

import { Content } from "antd/lib/layout/layout";

const PagesItemsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "layouts") router.push(`/website-pages`);
    else router.push(`/website-pages/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace(`/website-pages/`, "");

  const menuitems: TabsProps["items"] = [
    {
      key: "layouts",
      label: "Layouts",
      icon: <AppstoreOutlined />,
    },

    {
      key: "pages",
      label: "Pages",
      icon: <FileTextOutlined />,
    },

    {
      key: "navigation",
      label: "Navigation",
      icon: <MenuOutlined />,
    },
    {
      key: "footer",
      label: "Footer",
      icon: <MenuFoldOutlined />,
    },
    {
      key: "seo",
      label: "Seo",
      icon: <GlobalOutlined />,
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
          Mana Website Admin
        </Title>
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

export default PagesItemsLayout;
