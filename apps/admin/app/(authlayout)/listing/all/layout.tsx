"use client";

import { Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import Stats from "../../../../components/listing/Stats";
import Create from "../../../../components/listing/create/Create";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "All",
      icon: <UnorderedListOutlined />,
    },
    {
      key: "approved",
      label: "Approved",
      icon: <CheckCircleOutlined />,
    },
    {
      key: "pending",
      label: "Pending",
      icon: <ClockCircleOutlined />,
    },

    {
      key: "disabled",
      label: "Disabled",
      icon: <CloseCircleOutlined />,
    },

    {
      key: "rejected",
      label: "Rejected",
      icon: <CloseCircleOutlined />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "all") router.push(`/listing/all`);
    else router.push(`/listing/all/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/listing/all", "");
  return (
    <>
      <Stats />
      <Card extra="">
        <Tabs
          tabBarExtraContent={<Create />}
          defaultActiveKey={activeTab}
          items={items}
          onChange={onChange}
        />
        {children}
      </Card>
    </>
  );
}

export default RootLayout;
