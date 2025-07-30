"use client";

import { Button, Card, Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import CreateOffers from "../../../../components/offers/post/Create";
import { useState } from "react";
import Stats from "../../../../components/offers/Stats";

function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    {
      key: "all",
      label: "All",
      icon: <UnorderedListOutlined />,
    },
    {
      key: "active",
      label: "Active",
      icon: <CheckCircleOutlined />,
    },
    {
      key: "in-active",
      label: "In-Active",
      icon: <ClockCircleOutlined />,
    },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "all") router.push(`/offers/all`);
    else router.push(`/offers/all/${key}`);
  };
  const pathname = usePathname();
  const activeTab = pathname.replace("/offers/all", "");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Stats />
      <Card extra="">
        <Tabs
          tabBarExtraContent={
            <>
              <Button type="primary" onClick={() => setOpen(true)}>
                Add
              </Button>
              <CreateOffers
                type="create"
                initialValues={null}
                onClose={() => setOpen(false)}
                open={open}
              />
            </>
          }
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
