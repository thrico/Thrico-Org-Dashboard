import React from "react";
import { Table, Avatar, Tag, Card } from "antd";
import type { ColumnsType } from "antd/es/table";

interface UserData {
  key: string;
  name: string;
  avatar: string;
  activities: number;
  lastActive: string;
  status: "Online" | "Away";
}

const columns: ColumnsType<UserData> = [
  {
    title: "USER",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar src={record.avatar} />
        <span>{record.name}</span>
      </div>
    ),
  },
  {
    title: "ACTIVITIES",
    dataIndex: "activities",
    key: "activities",
  },
  {
    title: "LAST ACTIVE",
    dataIndex: "lastActive",
    key: "lastActive",
  },
];

const data: UserData[] = [
  {
    key: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    activities: 1234,
    lastActive: "2 minutes ago",
    status: "Online",
  },
  {
    key: "2",
    name: "Mark Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    activities: 987,
    lastActive: "15 minutes ago",
    status: "Away",
  },
];

export const ActiveMentor: React.FC = () => {
  return (
    <Card title="Most Active Mentor">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ marginTop: 24 }}
      />
    </Card>
  );
};
