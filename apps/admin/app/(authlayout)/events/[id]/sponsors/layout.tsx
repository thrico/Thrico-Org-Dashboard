"use client";

import { Button, Row, Space, Tabs, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";
import {
  VideoCameraOutlined,
  EnvironmentOutlined,
  DeploymentUnitOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";

const tabItems: TabsProps["items"] = [
  {
    key: "tier",
    label: "Sponsorship Tiers",
  },
  {
    key: "special-sponsors",
    label: "Special Sponsors",
  },
];

export default function VenueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // e.g., /events/venue/virtual

  const onTabChange = (key: string) => {
    router.push(`/events/sddsd/sponsors/${key}`);
  };

  const { Title, Text } = Typography;

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Row justify="space-between" align="middle">
        <Title level={4}>Sponsorship</Title>

        <Button type="primary" icon={<PlusOutlined />}>
          Add Sponsor{" "}
          {pathname?.split("/")[4] === "tier" ? "Tier" : "Special Sponsor"}
        </Button>
      </Row>
      <Tabs
        activeKey={pathname?.split("/")[4]}
        onChange={onTabChange}
        items={tabItems}
        tabBarGutter={16}
        type="line"
        style={{ color: "white" }}
        className="custom-venue-tabs"
      />
      <div style={{ marginTop: 24 }}>{children}</div>
    </Space>
  );
}
