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

import Stats from "../../../../components/jobs/Stats";
import Create from "../../../../components/events/create/Create";
import AllEvents from "../../../../components/events/all-events";
import { useAllEvents, EventStatus } from "../../../../graphql/actions/events";

function RootLayout({ children }: { children: React.ReactNode }) {
  const {
    data: eventsData,
    loading,
    error,
  } = useAllEvents({
    variables: {
      input: {},
    },
  });

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
  const onChange = (key: string) => {};
  const pathname = usePathname();
  const activeTab = pathname.replace("/events/all", "");
  return (
    <>
      <Card extra="">
        <Tabs
          tabBarExtraContent={<Create />}
          defaultActiveKey={activeTab}
          items={items}
          onChange={onChange}
        />
        <AllEvents data={eventsData?.getAllEvents} loading={loading} />
      </Card>
    </>
  );
}

export default RootLayout;
