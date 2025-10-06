// Dashboard.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  Button,
  Space,
  Select,
  DatePicker,
  Badge,
  Progress,
  Tooltip,
  Avatar,
  List,
  Tag,
  Divider,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ClockCircleOutlined,
  UserOutlined,
  EyeOutlined,
  MessageOutlined,
  CalendarOutlined,
  TrophyOutlined,
  ReloadOutlined,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Line, Bar, Pie, Area } from "@ant-design/plots";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<[any, any] | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [loading, setLoading] = useState(false);

  // Enhanced KPI data with better formatting
  const kpiData = [
    {
      title: "Total Users",
      value: 12547,
      prefix: <UserOutlined />,
      change: 12.5,
      trend: "up",
      color: "#52c41a",
      desc: "12.5% vs last month",
      target: 15000,
      progress: 83.6,
    },
    {
      title: "Active Users (30d)",
      value: 8942,
      prefix: <EyeOutlined />,
      change: -2.3,
      trend: "down",
      color: "#ff4d4f",
      desc: "2.3% vs last month",
      target: 10000,
      progress: 89.4,
    },
    {
      title: "User Engagement",
      value: 86.4,
      suffix: "%",
      prefix: <MessageOutlined />,
      change: 15.2,
      trend: "up",
      color: "#1890ff",
      desc: "15.2% vs last month",
      target: 90,
      progress: 96.0,
    },
    {
      title: "Avg Response Time",
      value: 245,
      suffix: "ms",
      prefix: <ClockCircleOutlined />,
      change: -8.1,
      trend: "up",
      color: "#52c41a",
      desc: "8.1% faster",
      target: 200,
      progress: 81.6,
    },
  ];

  // Enhanced chart data
  const userGrowthData = [
    { month: "Jan", users: 8500, newUsers: 1200, activeUsers: 7300 },
    { month: "Feb", users: 9200, newUsers: 1400, activeUsers: 7800 },
    { month: "Mar", users: 9800, newUsers: 1100, activeUsers: 8200 },
    { month: "Apr", users: 10500, newUsers: 1300, activeUsers: 8700 },
    { month: "May", users: 11200, newUsers: 1500, activeUsers: 9100 },
    { month: "Jun", users: 12547, newUsers: 1800, activeUsers: 8942 },
  ];

  const moduleActivityData = [
    { module: "Feed", users: 3420, engagement: 92, growth: 15.2 },
    { module: "Communities", users: 2890, engagement: 87, growth: 8.7 },
    { module: "Forum", users: 2156, engagement: 79, growth: 12.3 },
    { module: "Mentorship", users: 1876, engagement: 94, growth: 23.1 },
    { module: "Events", users: 1543, engagement: 85, growth: 6.8 },
    { module: "Jobs", users: 1234, engagement: 76, growth: -2.1 },
    { module: "Offers", users: 987, engagement: 81, growth: 18.9 },
    { module: "Listings", users: 743, engagement: 73, growth: 4.2 },
  ];

  const pieData = moduleActivityData.map((item) => ({
    type: item.module,
    value: item.users,
  }));

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      user: "Sarah Chen",
      action: "Created new community",
      module: "Communities",
      time: "2 minutes ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: 2,
      user: "Mike Johnson",
      action: "Published mentorship session",
      module: "Mentorship",
      time: "5 minutes ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    {
      id: 3,
      user: "Alex Kumar",
      action: "Posted job opportunity",
      module: "Jobs",
      time: "12 minutes ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      id: 4,
      user: "Lisa Wang",
      action: "Started forum discussion",
      module: "Forum",
      time: "25 minutes ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    },
  ];

  const lineConfig = {
    data: userGrowthData,
    xField: "month",
    yField: "users",
    smooth: true,
    color: "#1890ff",
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#1890ff",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
      customContent: (title: string, items: any[]) => {
        if (!items || items.length === 0) return null;
        const data = items[0]?.data;
        return (
          <div style={{ padding: "12px" }}>
            <h4 style={{ margin: 0, marginBottom: 8 }}>{title}</h4>
            <p style={{ margin: 0 }}>
              Total Users: {data?.users?.toLocaleString()}
            </p>
            <p style={{ margin: 0 }}>
              New Users: {data?.newUsers?.toLocaleString()}
            </p>
            <p style={{ margin: 0 }}>
              Active Users: {data?.activeUsers?.toLocaleString()}
            </p>
          </div>
        );
      },
    },
    annotations: [
      {
        type: "line",
        start: ["start", "median"],
        end: ["end", "median"],
        style: {
          stroke: "#FF6B3B",
          lineDash: [4, 5],
        },
      },
    ],
  };

  const barConfig = {
    data: moduleActivityData,
    xField: "module",
    yField: "users",
    colorField: "module",
    color: [
      "#1890ff",
      "#52c41a",
      "#faad14",
      "#f759ab",
      "#13c2c2",
      "#eb2f96",
      "#722ed1",
      "#fa541c",
    ],
    label: {
      position: "middle" as const,
      style: {
        fill: "#fff",
        opacity: 0.8,
      },
    },
    meta: {
      module: {
        alias: "Module",
      },
      users: {
        alias: "Active Users",
      },
    },
    tooltip: {
      customContent: (title: string, items: any[]) => {
        if (!items || items.length === 0) return null;
        const data = items[0]?.data;
        return (
          <div style={{ padding: "12px" }}>
            <h4 style={{ margin: 0, marginBottom: 8 }}>{data?.module}</h4>
            <p style={{ margin: 0 }}>
              Active Users: {data?.users?.toLocaleString()}
            </p>
            <p style={{ margin: 0 }}>Engagement: {data?.engagement}%</p>
            <p
              style={{
                margin: 0,
                color: data?.growth > 0 ? "#52c41a" : "#ff4d4f",
              }}
            >
              Growth: {data?.growth > 0 ? "+" : ""}
              {data?.growth}%
            </p>
          </div>
        );
      },
    },
  };

  const pieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [{ type: "element-active" }],
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleExport = () => {
    // Implementation for exporting data
    console.log("Exporting dashboard data...");
  };

  return (
    <div style={{ padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header Section */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
            <TrophyOutlined style={{ marginRight: 8 }} />
            Analytics Dashboard
          </Title>
          <Space>
            <Select
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              style={{ width: 120 }}
            >
              <Option value="7d">Last 7 days</Option>
              <Option value="30d">Last 30 days</Option>
              <Option value="90d">Last 90 days</Option>
              <Option value="1y">Last year</Option>
            </Select>
            <RangePicker onChange={setDateRange} />
            <Button icon={<FilterOutlined />}>Filter</Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={loading}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              Export
            </Button>
          </Space>
        </div>
        <Text type="secondary">
          Real-time insights and analytics for your platform performance
        </Text>
      </div>

      {/* KPI Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {kpiData.map((kpi, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                background: "linear-gradient(135deg, #fff 0%, #f8f9ff 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, textTransform: "uppercase" }}
                  >
                    {kpi.title}
                  </Text>
                  <div style={{ margin: "8px 0" }}>
                    <Statistic
                      value={kpi.value}
                      suffix={kpi.suffix}
                      valueStyle={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#262626",
                      }}
                    />
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    {kpi.trend === "up" ? (
                      <ArrowUpOutlined
                        style={{ color: "#52c41a", fontSize: 12 }}
                      />
                    ) : (
                      <ArrowDownOutlined
                        style={{ color: "#ff4d4f", fontSize: 12 }}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: 12,
                        color: kpi.trend === "up" ? "#52c41a" : "#ff4d4f",
                        fontWeight: 500,
                      }}
                    >
                      {kpi.desc}
                    </Text>
                  </div>
                  <Progress
                    percent={kpi.progress}
                    showInfo={false}
                    strokeColor={kpi.color}
                    size="small"
                    style={{ marginTop: 8 }}
                  />
                </div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${kpi.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: kpi.color,
                  }}
                >
                  {kpi.prefix}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card
            title="User Growth Trend"
            extra={
              <Space>
                <Badge status="processing" text="Live" />
                <Button size="small" type="text">
                  View Details
                </Button>
              </Space>
            }
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Line {...lineConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Module Distribution"
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Pie {...pieConfig} height={300} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card
            title="Module-wise User Activity"
            extra={
              <Tooltip title="Shows active users and engagement rates">
                <Button size="small" type="text">
                  Info
                </Button>
              </Tooltip>
            }
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Bar {...barConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Recent Activities"
            extra={<CalendarOutlined />}
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} size="small" />}
                    title={
                      <div style={{ fontSize: 13 }}>
                        <strong>{item.user}</strong> {item.action}
                      </div>
                    }
                    description={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Tag color="blue" style={{ fontSize: "11px" }}>
                          {item.module}
                        </Tag>
                        <Text type="secondary" style={{ fontSize: 11 }}>
                          {item.time}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Module Performance Grid */}
      <Card
        title="Module Performance Overview"
        style={{
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Row gutter={[16, 16]}>
          {moduleActivityData.map((module) => (
            <Col xs={24} sm={12} md={8} lg={6} key={module.module}>
              <Card
                size="small"
                hoverable
                bordered={false}
                style={{
                  background:
                    "linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%)",
                  borderRadius: 8,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <Title
                    level={5}
                    style={{ margin: "0 0 8px 0", color: "#1890ff" }}
                  >
                    {module.module}
                  </Title>
                  <Statistic
                    value={module.users}
                    title="Active Users"
                    valueStyle={{ fontSize: 18, color: "#262626" }}
                    style={{ marginBottom: 12 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        Engagement
                      </Text>
                      <div style={{ color: "#52c41a", fontWeight: "bold" }}>
                        {module.engagement}%
                      </div>
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        Growth
                      </Text>
                      <div
                        style={{
                          color: module.growth > 0 ? "#52c41a" : "#ff4d4f",
                          fontWeight: "bold",
                        }}
                      >
                        {module.growth > 0 ? "+" : ""}
                        {module.growth}%
                      </div>
                    </div>
                  </div>
                  <Progress
                    percent={module.engagement}
                    showInfo={false}
                    strokeColor="#52c41a"
                    size="small"
                    style={{ marginTop: 8 }}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;
