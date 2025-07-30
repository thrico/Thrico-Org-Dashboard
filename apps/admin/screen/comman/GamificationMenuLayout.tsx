import {
  AppstoreOutlined,
  EditOutlined,
  ToolOutlined,
  TrophyFilled,
  UnorderedListOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Layout, Tabs, TabsProps, theme, Typography } from "antd";

import React from "react";
import MainBreadcrumb from "./BreadCrumb";
import { usePathname, useRouter } from "next/navigation";
import { TbLogs } from "react-icons/tb";
import { Content } from "antd/lib/layout/layout";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/skeleton/Title";
import { getGetUser } from "../../graphql/actions";
import { BadgeSwissFrancIcon } from "lucide-react";
import { PiRankingBold } from "react-icons/pi";

const GamificationItemsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "dashboard") router.push(`/gamification`);
    else router.push(`/gamification/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace(`/gamification/`, "");

  const menuitems: TabsProps["items"] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <AppstoreOutlined />,
    },
    {
      key: "points",
      label: "Points",
      icon: <TrophyFilled />,
    },
    {
      key: "badges",
      label: "Badges",
      icon: <BadgeSwissFrancIcon />,
    },
    {
      key: "rank",
      label: "Rank",
      icon: <PiRankingBold />,
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
          Gamification Admin
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

export default GamificationItemsLayout;
