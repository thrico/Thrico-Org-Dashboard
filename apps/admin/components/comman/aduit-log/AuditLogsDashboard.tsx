"use client";

import { useState } from "react";
import {
  Layout,
  Menu,
  Table,
  Tag,
  Card,
  Row,
  Col,
  Statistic,
  DatePicker,
  Select,
  Space,
  Typography,
} from "antd";
import {
  DashboardOutlined,
  HistoryOutlined,
  UserOutlined,
  SettingOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  EditOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { Dayjs } from "dayjs";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: "add" | "remove" | "edit" | "status_change";
  resource: string;
  details: string;
  ipAddress: string;
}

const AuditLogsDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [actionFilter, setActionFilter] = useState<string | null>(null);

  // Sample audit logs data
  const auditLogs: AuditLog[] = [
    {
      id: "1",
      timestamp: "2025-05-15 14:30:22",
      user: "john.doe@example.com",
      action: "add",
      resource: "User",
      details: "Added new user: jane.smith@example.com",
      ipAddress: "192.168.1.1",
    },
    {
      id: "2",
      timestamp: "2025-05-15 13:45:10",
      user: "admin@example.com",
      action: "remove",
      resource: "Product",
      details: "Removed product: SKU-12345",
      ipAddress: "192.168.1.2",
    },
    {
      id: "3",
      timestamp: "2025-05-15 12:15:45",
      user: "jane.smith@example.com",
      action: "edit",
      resource: "Order",
      details: "Updated shipping address for order #ORD-789",
      ipAddress: "192.168.1.3",
    },
    {
      id: "4",
      timestamp: "2025-05-15 11:05:30",
      user: "john.doe@example.com",
      action: "status_change",
      resource: "Order",
      details:
        "Changed status from 'Processing' to 'Shipped' for order #ORD-456",
      ipAddress: "192.168.1.1",
    },
    {
      id: "5",
      timestamp: "2025-05-15 10:22:15",
      user: "admin@example.com",
      action: "add",
      resource: "Product",
      details: "Added new product: SKU-67890",
      ipAddress: "192.168.1.2",
    },
    {
      id: "6",
      timestamp: "2025-05-14 16:40:05",
      user: "jane.smith@example.com",
      action: "edit",
      resource: "User",
      details: "Updated profile information for user: john.doe@example.com",
      ipAddress: "192.168.1.3",
    },
    {
      id: "7",
      timestamp: "2025-05-14 15:12:33",
      user: "john.doe@example.com",
      action: "status_change",
      resource: "Task",
      details:
        "Changed status from 'In Progress' to 'Completed' for task #TSK-123",
      ipAddress: "192.168.1.1",
    },
    {
      id: "8",
      timestamp: "2025-05-14 14:05:18",
      user: "admin@example.com",
      action: "remove",
      resource: "User",
      details: "Removed user: guest@example.com",
      ipAddress: "192.168.1.2",
    },
  ];

  // Count logs by action type
  const addCount = auditLogs.filter((log) => log.action === "add").length;
  const removeCount = auditLogs.filter((log) => log.action === "remove").length;
  const editCount = auditLogs.filter((log) => log.action === "edit").length;
  const statusChangeCount = auditLogs.filter(
    (log) => log.action === "status_change"
  ).length;

  // Filter logs based on selected filters
  const filteredLogs = auditLogs.filter((log) => {
    if (actionFilter && log.action !== actionFilter) {
      return false;
    }
    return true;
  });

  const columns: ColumnsType<AuditLog> = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action: string) => {
        let color = "";
        let icon = null;
        let text = "";

        switch (action) {
          case "add":
            color = "success";
            icon = <PlusCircleOutlined />;
            text = "Add";
            break;
          case "remove":
            color = "error";
            icon = <MinusCircleOutlined />;
            text = "Remove";
            break;
          case "edit":
            color = "warning";
            icon = <EditOutlined />;
            text = "Edit";
            break;
          case "status_change":
            color = "processing";
            icon = <SwapOutlined />;
            text = "Status Change";
            break;
        }

        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      },
      filters: [
        { text: "Add", value: "add" },
        { text: "Remove", value: "remove" },
        { text: "Edit", value: "edit" },
        { text: "Status Change", value: "status_change" },
      ],
      onFilter: (value, record) => record.action === value,
    },
    {
      title: "Resource",
      dataIndex: "resource",
      key: "resource",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      ellipsis: true,
    },
    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
  ];

  return (
    <Card title="Audit Logs Dashboard">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Add Actions"
              value={addCount}
              valueStyle={{ color: "#3f8600" }}
              prefix={<PlusCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Remove Actions"
              value={removeCount}
              valueStyle={{ color: "#cf1322" }}
              prefix={<MinusCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Edit Actions"
              value={editCount}
              valueStyle={{ color: "#faad14" }}
              prefix={<EditOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Status Changes"
              value={statusChangeCount}
              valueStyle={{ color: "#1890ff" }}
              prefix={<SwapOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Space>
          <RangePicker
            onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | null)}
          />
          <Select
            placeholder="Filter by action"
            style={{ width: 200 }}
            allowClear
            onChange={setActionFilter}
            options={[
              { value: "add", label: "Add" },
              { value: "remove", label: "Remove" },
              { value: "edit", label: "Edit" },
              { value: "status_change", label: "Status Change" },
            ]}
          />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredLogs}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              <strong>Details:</strong> {record.details}
            </p>
          ),
        }}
      />
    </Card>
  );
};

export default AuditLogsDashboard;
