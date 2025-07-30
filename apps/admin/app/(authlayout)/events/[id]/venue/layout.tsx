"use client";

import { Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  VideoCameraOutlined,
  EnvironmentOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";

const tabItems: TabsProps["items"] = [
  {
    key: "physical",
    label: (
      <span>
        <EnvironmentOutlined /> Physical Venue
      </span>
    ),
  },
  {
    key: "virtual",
    label: (
      <span>
        <VideoCameraOutlined /> Virtual Link
      </span>
    ),
  },
  {
    key: "hybrid",
    label: (
      <span>
        <DeploymentUnitOutlined /> Hybrid Mapping
      </span>
    ),
  },
];

export default function VenueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // e.g., /events/venue/virtual
  const currentTab = pathname?.split("/")[3] || "physical";

  const onTabChange = (key: string) => {
    router.push(`/events/sddsd/venue/${key}`);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 24,
        }}
      >
        Venue
      </h2>
      <Tabs
        activeKey={currentTab}
        onChange={onTabChange}
        items={tabItems}
        tabBarGutter={16}
        type="line"
        style={{ color: "white" }}
        className="custom-venue-tabs"
      />
      <div style={{ marginTop: 24 }}>{children}</div>
    </div>
  );
}
