"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Drawer,
  Empty,
  List,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  HistoryOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const { Text, Title } = Typography;

interface AuditLogProps {
  userId: string;
  limit?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
  onViewDetails?: (log: any) => void;
}

export function AuditLogSidebar({
  userId,
  limit = 5,
  showViewAll = true,
  onViewAll,
  onViewDetails,
  isAuditModalOpen,
  setIsAuditModalOpen,
}: AuditLogProps) {
  // In a real app, you would fetch logs for this specific user
  const [logs, setLogs] = useState(getMockLogsForUser(userId).slice(0, limit));

  const getActionTag = (action: string) => {
    switch (action) {
      case "ADD":
        return <Tag color="success">Add</Tag>;
      case "REMOVE":
        return <Tag color="error">Remove</Tag>;
      case "UPDATE":
        return <Tag color="processing">Update</Tag>;
      default:
        return <Tag>Unknown</Tag>;
    }
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Tag color="success">Approved</Tag>;
      case "REJECTED":
        return <Tag color="error">Rejected</Tag>;
      case "REQUESTED":
        return <Tag color="warning">Requested</Tag>;
      case "STATUS":
        return <Tag color="blue">Status Change</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  return (
    <Drawer
      onClose={() => setIsAuditModalOpen(false)}
      extra={
        <Button type="link" onClick={onViewAll}>
          View All
        </Button>
      }
      title="Recent Activity"
      width={1000}
      open={isAuditModalOpen}
    >
      <Card>
        {logs.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={logs}
            renderItem={(log) => (
              <List.Item
                actions={[
                  <Button
                    key="view"
                    type="link"
                    size="small"
                    onClick={() => onViewDetails && onViewDetails(log)}
                  >
                    Details
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Space>{getActionTag(log.action)}</Space>}
                  title={
                    <Space>
                      {getStatusTag(log.status)}
                      <Text>{getLogSummary(log)}</Text>
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size={0}>
                      <Space size="small">
                        <UserOutlined />
                        <Text type="secondary">{log.performedBy.name}</Text>
                      </Space>
                      <Space size="small">
                        <ClockCircleOutlined />
                        <Tooltip
                          title={dayjs(log.createdAt).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        >
                          <Text type="secondary">
                            {dayjs(log.createdAt).fromNow()}
                          </Text>
                        </Tooltip>
                      </Space>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty description="No activity logs found" />
        )}
      </Card>
    </Drawer>
  );
}

// Helper function to generate a summary of the log
function getLogSummary(log: any) {
  switch (log.action) {
    case "ADD":
      return `Added ${log.entity.type.toLowerCase()}`;
    case "REMOVE":
      return `Removed ${log.entity.type.toLowerCase()}`;
    case "UPDATE":
      if (log.status === "STATUS") {
        const oldStatus = log.previousState?.status || "unknown";
        const newStatus = log.newState?.status || "unknown";
        return `Changed status from ${oldStatus} to ${newStatus}`;
      }
      return `Updated ${log.entity.type.toLowerCase()}`;
    default:
      return `Action on ${log.entity.type.toLowerCase()}`;
  }
}

// Mock function to get logs for a specific user
function getMockLogsForUser(userId: string) {
  // This would be replaced with an API call in a real app
  return [
    {
      id: "log-001",
      userToEntityId: userId,
      action: "UPDATE",
      status: "STATUS",
      performedBy: {
        id: "admin-001",
        name: "John Admin",
        role: "Administrator",
      },
      reason: "User account flagged for suspicious activity",
      previousState: {
        status: "ACTIVE",
        updatedAt: "2025-05-15T14:20:00Z",
      },
      newState: {
        status: "FLAGGED",
        updatedAt: "2025-05-17T09:45:00Z",
      },
      createdAt: "2025-05-17T09:45:00Z",
      entity: {
        id: userId,
        name: "User Account",
        type: "USER",
      },
    },
    {
      id: "log-002",
      userToEntityId: userId,
      action: "UPDATE",
      status: "STATUS",
      performedBy: {
        id: "admin-002",
        name: "Sarah Moderator",
        role: "Moderator",
      },
      reason: "Profile information updated and verified",
      previousState: {
        status: "PENDING_REVIEW",
        updatedAt: "2025-05-10T11:15:00Z",
      },
      newState: {
        status: "ACTIVE",
        updatedAt: "2025-05-12T16:30:00Z",
      },
      createdAt: "2025-05-12T16:30:00Z",
      entity: {
        id: userId,
        name: "User Profile",
        type: "USER",
      },
    },
    {
      id: "log-003",
      userToEntityId: `connection-${userId}-user123`,
      action: "ADD",
      status: "APPROVED",
      performedBy: {
        id: "system",
        name: "System",
        role: "System",
      },
      reason: "Connection automatically approved",
      previousState: null,
      newState: {
        status: "APPROVED",
        updatedAt: "2025-05-08T09:45:00Z",
      },
      createdAt: "2025-05-08T09:45:00Z",
      entity: {
        id: `connection-${userId}-user123`,
        name: "Connection with User 123",
        type: "CONNECTION",
      },
    },
    {
      id: "log-004",
      userToEntityId: userId,
      action: "ADD",
      status: "REQUESTED",
      performedBy: {
        id: userId,
        name: "Self",
        role: "User",
      },
      reason: "User registration",
      previousState: null,
      newState: {
        status: "REQUESTED",
        updatedAt: "2025-05-05T11:20:00Z",
      },
      createdAt: "2025-05-05T11:20:00Z",
      entity: {
        id: userId,
        name: "User Account",
        type: "USER",
      },
    },
    {
      id: "log-005",
      userToEntityId: userId,
      action: "UPDATE",
      status: "APPROVED",
      performedBy: {
        id: "admin-001",
        name: "John Admin",
        role: "Administrator",
      },
      reason: "User account approved after verification",
      previousState: {
        status: "REQUESTED",
        updatedAt: "2025-05-05T11:20:00Z",
      },
      newState: {
        status: "APPROVED",
        updatedAt: "2025-05-06T10:15:00Z",
      },
      createdAt: "2025-05-06T10:15:00Z",
      entity: {
        id: userId,
        name: "User Account",
        type: "USER",
      },
    },
  ];
}
