"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Drawer,
  Input,
  Layout,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  Tooltip,
  Badge,
  Divider,
  Modal,
} from "antd";
import {
  DownloadOutlined,
  EyeOutlined,
  HistoryOutlined,
  SearchOutlined,
  UserOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  DiffOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const { Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// Mock data for audit logs
const auditLogs = [
  {
    id: "1",
    userToEntityId: "user-entity-001",
    action: "ADD",
    status: "APPROVED",
    performedBy: {
      id: "admin-001",
      name: "John Admin",
      role: "Administrator",
    },
    reason: "New user registration approved",
    previousState: null,
    newState: {
      status: "APPROVED",
      updatedAt: "2025-05-18T10:30:00Z",
    },
    createdAt: "2025-05-18T10:30:00Z",
    entity: {
      id: "user-001",
      name: "Alice Smith",
      type: "USER",
    },
  },
  {
    id: "2",
    userToEntityId: "user-entity-002",
    action: "UPDATE",
    status: "STATUS",
    performedBy: {
      id: "admin-002",
      name: "Sarah Moderator",
      role: "Moderator",
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
      id: "user-002",
      name: "Bob Johnson",
      type: "USER",
    },
  },
  {
    id: "3",
    userToEntityId: "user-entity-003",
    action: "UPDATE",
    status: "STATUS",
    performedBy: {
      id: "admin-001",
      name: "John Admin",
      role: "Administrator",
    },
    reason: "User requested account deactivation",
    previousState: {
      status: "ACTIVE",
      updatedAt: "2025-05-10T11:15:00Z",
    },
    newState: {
      status: "INACTIVE",
      updatedAt: "2025-05-16T16:30:00Z",
    },
    createdAt: "2025-05-16T16:30:00Z",
    entity: {
      id: "user-003",
      name: "Carol Williams",
      type: "USER",
    },
  },
  {
    id: "4",
    userToEntityId: "connection-001",
    action: "REMOVE",
    status: "STATUS",
    performedBy: {
      id: "admin-003",
      name: "Mike Supervisor",
      role: "Supervisor",
    },
    reason: "Connection removed due to policy violation",
    previousState: {
      status: "ACTIVE",
      updatedAt: "2025-05-12T08:20:00Z",
    },
    newState: null,
    createdAt: "2025-05-15T13:10:00Z",
    entity: {
      id: "connection-001",
      name: "Connection between User A and User B",
      type: "CONNECTION",
    },
  },
  {
    id: "5",
    userToEntityId: "user-entity-004",
    action: "UPDATE",
    status: "REJECTED",
    performedBy: {
      id: "admin-002",
      name: "Sarah Moderator",
      role: "Moderator",
    },
    reason: "User profile update rejected due to inappropriate content",
    previousState: {
      status: "PENDING_REVIEW",
      updatedAt: "2025-05-13T15:45:00Z",
    },
    newState: {
      status: "REJECTED",
      updatedAt: "2025-05-14T09:30:00Z",
    },
    createdAt: "2025-05-14T09:30:00Z",
    entity: {
      id: "user-004",
      name: "David Brown",
      type: "USER",
    },
  },
  {
    id: "6",
    userToEntityId: "user-entity-005",
    action: "ADD",
    status: "REQUESTED",
    performedBy: {
      id: "user-005",
      name: "Eva Green",
      role: "User",
    },
    reason: "User requested access to premium features",
    previousState: null,
    newState: {
      status: "REQUESTED",
      updatedAt: "2025-05-13T11:20:00Z",
    },
    createdAt: "2025-05-13T11:20:00Z",
    entity: {
      id: "user-005",
      name: "Eva Green",
      type: "USER",
    },
  },
  {
    id: "7",
    userToEntityId: "user-entity-006",
    action: "UPDATE",
    status: "STATUS",
    performedBy: {
      id: "admin-001",
      name: "John Admin",
      role: "Administrator",
    },
    reason: "User account blocked due to multiple violations",
    previousState: {
      status: "FLAGGED",
      updatedAt: "2025-05-10T14:30:00Z",
    },
    newState: {
      status: "BLOCKED",
      updatedAt: "2025-05-12T10:15:00Z",
    },
    createdAt: "2025-05-12T10:15:00Z",
    entity: {
      id: "user-006",
      name: "Frank Miller",
      type: "USER",
    },
  },
  {
    id: "8",
    userToEntityId: "connection-002",
    action: "ADD",
    status: "APPROVED",
    performedBy: {
      id: "system",
      name: "System",
      role: "System",
    },
    reason: "Automatic connection approval based on mutual connections",
    previousState: null,
    newState: {
      status: "APPROVED",
      updatedAt: "2025-05-11T09:45:00Z",
    },
    createdAt: "2025-05-11T09:45:00Z",
    entity: {
      id: "connection-002",
      name: "Connection between User C and User D",
      type: "CONNECTION",
    },
  },
  {
    id: "9",
    userToEntityId: "user-entity-007",
    action: "UPDATE",
    status: "STATUS",
    performedBy: {
      id: "admin-002",
      name: "Sarah Moderator",
      role: "Moderator",
    },
    reason: "User account reactivated after verification",
    previousState: {
      status: "INACTIVE",
      updatedAt: "2025-05-08T16:20:00Z",
    },
    newState: {
      status: "ACTIVE",
      updatedAt: "2025-05-10T11:30:00Z",
    },
    createdAt: "2025-05-10T11:30:00Z",
    entity: {
      id: "user-007",
      name: "Grace Taylor",
      type: "USER",
    },
  },
  {
    id: "10",
    userToEntityId: "user-entity-008",
    action: "REMOVE",
    status: "STATUS",
    performedBy: {
      id: "user-008",
      name: "Henry Wilson",
      role: "User",
    },
    reason: "User requested account deletion",
    previousState: {
      status: "ACTIVE",
      updatedAt: "2025-05-05T10:15:00Z",
    },
    newState: null,
    createdAt: "2025-05-09T14:25:00Z",
    entity: {
      id: "user-008",
      name: "Henry Wilson",
      type: "USER",
    },
  },
];

interface AuditLogType {
  id: string;
  userToEntityId: string;
  action: string;
  status: string;
  performedBy: {
    id: string;
    name: string;
    role: string;
  };
  reason: string | null;
  previousState: any;
  newState: any;
  createdAt: string;
  entity: {
    id: string;
    name: string;
    type: string;
  };
}

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [entityTypeFilter, setEntityTypeFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);
  const [selectedLog, setSelectedLog] = useState<AuditLogType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDiffModalOpen, setIsDiffModalOpen] = useState(false);

  const handleDateRangeChange: RangePickerProps["onChange"] = (dates) => {
    setDateRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null]);
  };

  const handleViewDetails = (log: AuditLogType) => {
    setSelectedLog(log);
    setIsDrawerOpen(true);
  };

  const handleViewDiff = (log: AuditLogType) => {
    setSelectedLog(log);
    setIsDiffModalOpen(true);
  };

  const handleExportLogs = () => {
    // In a real app, this would trigger a download of the filtered logs
    console.log("Exporting logs with current filters");
    // You could implement CSV or Excel export here
  };

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

  const getEntityTypeTag = (type: string) => {
    switch (type) {
      case "USER":
        return <Tag color="purple">User</Tag>;
      case "CONNECTION":
        return <Tag color="geekblue">Connection</Tag>;
      default:
        return <Tag>{type}</Tag>;
    }
  };

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.performedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.reason &&
        log.reason.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAction = actionFilter ? log.action === actionFilter : true;
    const matchesStatus = statusFilter ? log.status === statusFilter : true;
    const matchesEntityType = entityTypeFilter
      ? log.entity.type === entityTypeFilter
      : true;

    const matchesDateRange = dateRange
      ? dateRange[0] && dateRange[1]
        ? dayjs(log.createdAt).isAfter(dateRange[0]) &&
          dayjs(log.createdAt).isBefore(dateRange[1])
        : true
      : true;

    return (
      matchesSearch &&
      matchesAction &&
      matchesStatus &&
      matchesEntityType &&
      matchesDateRange
    );
  });

  const columns: TableProps<AuditLogType>["columns"] = [
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <Tooltip title={dayjs(text).format("YYYY-MM-DD HH:mm:ss")}>
          <span>{dayjs(text).fromNow()}</span>
        </Tooltip>
      ),
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      defaultSortOrder: "descend",
    },
    {
      title: "Entity",
      key: "entity",
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Space>
            {getEntityTypeTag(record.entity.type)}
            <Text strong>{record.entity.name}</Text>
          </Space>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            ID: {record.entity.id.substring(0, 8)}...
          </Text>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (text) => getActionTag(text),
      filters: [
        { text: "Add", value: "ADD" },
        { text: "Remove", value: "REMOVE" },
        { text: "Update", value: "UPDATE" },
      ],
      onFilter: (value, record) => record.action === value,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text) => getStatusTag(text),
      filters: [
        { text: "Approved", value: "APPROVED" },
        { text: "Rejected", value: "REJECTED" },
        { text: "Requested", value: "REQUESTED" },
        { text: "Status Change", value: "STATUS" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Performed By",
      key: "performedBy",
      render: (_, record) => (
        <Space>
          <Badge
            color={
              record.performedBy.role === "Administrator"
                ? "red"
                : record.performedBy.role === "Moderator"
                  ? "blue"
                  : record.performedBy.role === "System"
                    ? "purple"
                    : "green"
            }
          />
          <span>{record.performedBy.name}</span>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            ({record.performedBy.role})
          </Text>
        </Space>
      ),
    },
    {
      title: "Reason",
      key: "reason",
      dataIndex: "reason",
      render: (text) => (
        <Tooltip title={text}>
          <div
            style={{
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {text || "-"}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(record);
              }}
            />
          </Tooltip>
          {record.previousState && record.newState && (
            <Tooltip title="View Changes">
              <Button
                type="text"
                icon={<DiffOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDiff(record);
                }}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Content style={{ padding: "24px" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={3}>
            <HistoryOutlined /> Audit Logs
          </Title>
          <Text type="secondary">
            Track all changes and actions performed in the system
          </Text>
        </Col>
        <Col>
          <Button icon={<DownloadOutlined />} onClick={handleExportLogs}>
            Export Logs
          </Button>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col xs={24} sm={8} md={6}>
              <Input
                placeholder="Search by entity, user or reason..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Select
                placeholder="Filter by Action"
                allowClear
                style={{ width: "100%" }}
                onChange={(value) => setActionFilter(value)}
                options={[
                  { value: "ADD", label: "Add" },
                  { value: "REMOVE", label: "Remove" },
                  { value: "UPDATE", label: "Update" },
                ]}
              />
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Select
                placeholder="Filter by Status"
                allowClear
                style={{ width: "100%" }}
                onChange={(value) => setStatusFilter(value)}
                options={[
                  { value: "APPROVED", label: "Approved" },
                  { value: "REJECTED", label: "Rejected" },
                  { value: "REQUESTED", label: "Requested" },
                  { value: "STATUS", label: "Status Change" },
                ]}
              />
            </Col>
            <Col xs={24} md={6}>
              <RangePicker
                style={{ width: "100%" }}
                onChange={handleDateRangeChange}
                placeholder={["Start Date", "End Date"]}
              />
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={filteredLogs}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No audit logs found matching your criteria" }}
          onRow={(record) => ({
            onClick: () => handleViewDetails(record),
            style: { cursor: "pointer" },
          })}
        />
      </Card>

      {/* Audit Log Details Drawer */}
      <Drawer
        title={
          <Space>
            <HistoryOutlined />
            <span>Audit Log Details</span>
          </Space>
        }
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={600}
        extra={
          selectedLog?.previousState && selectedLog?.newState ? (
            <Button
              icon={<DiffOutlined />}
              onClick={() => handleViewDiff(selectedLog)}
            >
              View Changes
            </Button>
          ) : null
        }
      >
        {selectedLog && (
          <>
            <Descriptions title="Basic Information" bordered column={1}>
              <Descriptions.Item label="Log ID">
                {selectedLog.id}
              </Descriptions.Item>
              <Descriptions.Item label="Date & Time">
                {dayjs(selectedLog.createdAt).format("YYYY-MM-DD HH:mm:ss")} (
                {dayjs(selectedLog.createdAt).fromNow()})
              </Descriptions.Item>
              <Descriptions.Item label="Action">
                {getActionTag(selectedLog.action)}{" "}
                {getStatusTag(selectedLog.status)}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Entity Information" bordered column={1}>
              <Descriptions.Item label="Entity Type">
                {getEntityTypeTag(selectedLog.entity.type)}
              </Descriptions.Item>
              <Descriptions.Item label="Entity Name">
                {selectedLog.entity.name}
              </Descriptions.Item>
              <Descriptions.Item label="Entity ID">
                {selectedLog.entity.id}
              </Descriptions.Item>
              <Descriptions.Item label="User-Entity ID">
                {selectedLog.userToEntityId}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Action Information" bordered column={1}>
              <Descriptions.Item label="Performed By">
                <Space>
                  <UserOutlined />
                  {selectedLog.performedBy.name} ({selectedLog.performedBy.role}
                  )
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Reason">
                {selectedLog.reason || (
                  <Text type="secondary">No reason provided</Text>
                )}
              </Descriptions.Item>
            </Descriptions>

            {(selectedLog.previousState || selectedLog.newState) && (
              <>
                <Divider />
                <Title level={5}>State Changes</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Card
                      title={
                        <Space>
                          <ClockCircleOutlined />
                          Previous State
                        </Space>
                      }
                      size="small"
                    >
                      {selectedLog.previousState ? (
                        <pre style={{ maxHeight: 300, overflow: "auto" }}>
                          {JSON.stringify(selectedLog.previousState, null, 2)}
                        </pre>
                      ) : (
                        <Text type="secondary">
                          No previous state (new record)
                        </Text>
                      )}
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      title={
                        <Space>
                          <ClockCircleOutlined />
                          New State
                        </Space>
                      }
                      size="small"
                    >
                      {selectedLog.newState ? (
                        <pre style={{ maxHeight: 300, overflow: "auto" }}>
                          {JSON.stringify(selectedLog.newState, null, 2)}
                        </pre>
                      ) : (
                        <Text type="secondary">
                          No new state (record removed)
                        </Text>
                      )}
                    </Card>
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
      </Drawer>

      {/* Diff Modal */}
      <Modal
        title={
          <Space>
            <DiffOutlined />
            <span>State Changes</span>
          </Space>
        }
        open={isDiffModalOpen}
        onCancel={() => setIsDiffModalOpen(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsDiffModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedLog && (
          <div>
            <Alert
              type="info"
              icon={<InfoCircleOutlined />}
              message="This view shows the changes made in this action"
              style={{ marginBottom: 16 }}
            />

            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card
                  title={
                    <Space>
                      <FileTextOutlined />
                      Changes Summary
                    </Space>
                  }
                >
                  <Table
                    dataSource={getChanges(selectedLog)}
                    columns={[
                      {
                        title: "Field",
                        dataIndex: "field",
                        key: "field",
                        render: (text) => <Text strong>{text}</Text>,
                      },
                      {
                        title: "Previous Value",
                        dataIndex: "previousValue",
                        key: "previousValue",
                        render: (text) => (
                          <Text
                            delete={text !== undefined}
                            type={text !== undefined ? "danger" : "secondary"}
                          >
                            {text !== undefined ? text : "N/A"}
                          </Text>
                        ),
                      },
                      {
                        title: "New Value",
                        dataIndex: "newValue",
                        key: "newValue",
                        render: (text) => (
                          <Text
                            type={text !== undefined ? "success" : "secondary"}
                          >
                            {text !== undefined ? text : "N/A"}
                          </Text>
                        ),
                      },
                    ]}
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </Content>
  );
}

// Helper function to extract changes between previous and new state
function getChanges(log: AuditLogType) {
  const changes: { field: string; previousValue: any; newValue: any }[] = [];

  if (!log.previousState && log.newState) {
    // New record
    Object.entries(log.newState).forEach(([key, value]) => {
      changes.push({
        field: key,
        previousValue: undefined,
        newValue: JSON.stringify(value),
      });
    });
  } else if (log.previousState && !log.newState) {
    // Removed record
    Object.entries(log.previousState).forEach(([key, value]) => {
      changes.push({
        field: key,
        previousValue: JSON.stringify(value),
        newValue: undefined,
      });
    });
  } else if (log.previousState && log.newState) {
    // Updated record - find differences
    const allKeys = new Set([
      ...Object.keys(log.previousState),
      ...Object.keys(log.newState),
    ]);

    allKeys.forEach((key) => {
      const prevValue = log.previousState[key];
      const newValue = log.newState[key];

      if (JSON.stringify(prevValue) !== JSON.stringify(newValue)) {
        changes.push({
          field: key,
          previousValue: JSON.stringify(prevValue),
          newValue: JSON.stringify(newValue),
        });
      }
    });
  }

  return changes;
}

// Missing Alert component
const Alert = ({ type, icon, message, style }: any) => {
  const getColor = () => {
    switch (type) {
      case "info":
        return "#e6f7ff";
      case "success":
        return "#f6ffed";
      case "warning":
        return "#fffbe6";
      case "error":
        return "#fff2f0";
      default:
        return "#e6f7ff";
    }
  };

  return (
    <div
      style={{
        padding: "8px 15px",
        borderRadius: "2px",
        backgroundColor: getColor(),
        border: `1px solid ${getColor()}`,
        ...style,
      }}
    >
      <Space>
        {icon}
        <span>{message}</span>
      </Space>
    </div>
  );
};
