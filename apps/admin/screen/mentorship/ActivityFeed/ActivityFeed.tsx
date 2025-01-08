import React from "react";
import { List, Avatar, Typography, Button, Card, Tag } from "antd";
import { CheckCircleOutlined, FileOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
const { Text, Title } = Typography;

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  detail?: string;
  status?: string;
  timestamp: string;
  meta?: {
    icon: React.ReactNode;
    text: string;
    color?: string;
  };
}

const activities: ActivityItem[] = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: 'Updated the project status to "In Progress"',
    timestamp: "2 minutes ago",
    meta: {
      icon: "•",
      text: "Project Status: In Progress",
      color: "#faad14",
    },
  },
  {
    id: "2",
    user: {
      name: "Mark Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Added new comment to Task #234",
    detail:
      '"We need to review the latest changes before proceeding with the deployment."',
    timestamp: "45 minutes ago",
  },
  {
    id: "3",
    user: {
      name: "Emily Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: 'Completed task "Update Documentation"',
    timestamp: "Yesterday at 4:30 PM",
    meta: {
      icon: <CheckCircleOutlined />,
      text: "Task marked as complete",
      color: "#52c41a",
    },
  },
  {
    id: "4",
    user: {
      name: "David Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: 'Created new project "Q4 Planning"',
    timestamp: "Yesterday at 2:15 PM",
    meta: {
      icon: <FileOutlined />,
      text: "New project created with 5 team members",
      color: "#1890ff",
    },
  },
];

export const ActivityLog: React.FC = () => {
  return (
    <Card>
      <Title level={5}>Activity</Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
        Recent system activities and user interactions
      </Text>

      <List
        dataSource={activities}
        renderItem={(item) => (
          <List.Item style={{ padding: "16px 0" }}>
            <List.Item.Meta
              avatar={<Avatar src={faker.image.avatar()} size={40} />}
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Text strong>{item.user.name}</Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {item.timestamp}
                  </Text>
                </div>
              }
              description={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Text>{item.action}</Text>
                  {item.detail && (
                    <Text
                      type="secondary"
                      style={{
                        background: "#f5f5f5",
                        padding: "8px",
                        borderRadius: "4px",
                      }}
                    >
                      {item.detail}
                    </Text>
                  )}
                  {item.meta && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Text style={{ color: item.meta.color }}>
                        {item.meta.icon}
                      </Text>
                      <Text type="secondary">{item.meta.text}</Text>
                    </div>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
        split
      />

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Button type="default">Load More Activities</Button>
      </div>
    </Card>
  );
};
