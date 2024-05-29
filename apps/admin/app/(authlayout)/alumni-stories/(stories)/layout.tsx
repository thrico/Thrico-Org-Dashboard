"use client";

import { Button, Card, Tabs, TabsProps } from "antd";
import { useRouter } from "next/navigation";

import {
  CheckCircleOutlined,
  ExportOutlined,
  OrderedListOutlined,
  PauseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
function RootLayout({ children }: { children: React.ReactNode }) {
  const items: TabsProps["items"] = [
    { key: "all", label: "All", icon: <OrderedListOutlined /> },
    { key: "approved", label: "Approved", icon: <CheckCircleOutlined /> },
    { key: "requests", label: "Requests", icon: <PauseCircleOutlined /> },
  ];
  const router = useRouter();
  const onChange = (key: string) => {
    if (key === "all") router.push(`/alumni-stories`);
    else router.push(`/alumni-stories/${key}`);
  };

  return (
    <Card
      title={"Alumni Stories"}
      extra={<Button icon={<ExportOutlined />}>Export</Button>}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      {children}
    </Card>
  );
}

export default RootLayout;
