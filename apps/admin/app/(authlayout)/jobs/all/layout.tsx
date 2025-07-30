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

import Create from "../../../../components/jobs/create/Create";
import Stats from "../../../../components/jobs/Stats";

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
    if (key === "all") router.push(`/jobs/all`);
    else router.push(`/jobs/all/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/jobs/all", "");
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
