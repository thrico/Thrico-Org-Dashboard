"use client";
import React, { useState } from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Space,
  Button,
  Avatar,
  Dropdown,
  DatePicker,
  Table,
  Tooltip,
  Statistic,
  Menu,
  Divider,
} from "antd";
import {
  DownloadOutlined,
  UserOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  AppstoreOutlined,
  DownOutlined,
  CalendarOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { uesGetUserAnalytics } from "../../../graphql/actions/user";
import { stat } from "fs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// Sample data for charts
const weeklySignupsData = [
  { day: "Mon", signups: 120 },
  { day: "Tue", signups: 132 },
  { day: "Wed", signups: 101 },
  { day: "Thu", signups: 134 },
  { day: "Fri", signups: 190 },
  { day: "Sat", signups: 230 },
  { day: "Sun", signups: 210 },
];

const topCommunitiesData = [
  { name: "Photography Enthusiasts", members: 12500 },
  { name: "Tech Innovators", members: 9800 },
  { name: "Fitness & Health", members: 8700 },
  { name: "Book Lovers", members: 7600 },
  { name: "Travel Adventures", members: 6500 },
];

const membersByInterestData = [
  { name: "Technology", value: 35 },
  { name: "Arts", value: 25 },
  { name: "Finance", value: 15 },
  { name: "Health", value: 15 },
  { name: "Other", value: 10 },
];

const communityPerformanceData = [
  {
    key: "1",
    name: "Photography Enthusiasts",
    slug: "photography-enthusiasts",
    members: 12500,
    activePercentage: 78,
    lastActivity: "2 hours ago",
  },
  {
    key: "2",
    name: "Tech Innovators",
    slug: "tech-innovators",
    members: 9800,
    activePercentage: 82,
    lastActivity: "1 hour ago",
  },
  {
    key: "3",
    name: "Fitness & Health",
    slug: "fitness-health",
    members: 8700,
    activePercentage: 65,
    lastActivity: "3 hours ago",
  },
  {
    key: "4",
    name: "Book Lovers",
    slug: "book-lovers",
    members: 7600,
    activePercentage: 58,
    lastActivity: "5 hours ago",
  },
  {
    key: "5",
    name: "Travel Adventures",
    slug: "travel-adventures",
    members: 6500,
    activePercentage: 72,
    lastActivity: "4 hours ago",
  },
  {
    key: "6",
    name: "Cooking Masters",
    slug: "cooking-masters",
    members: 5400,
    activePercentage: 67,
    lastActivity: "6 hours ago",
  },
  {
    key: "7",
    name: "Gaming Community",
    slug: "gaming-community",
    members: 11200,
    activePercentage: 88,
    lastActivity: "30 minutes ago",
  },
];

const columns = [
  {
    title: "Community Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <a href="#">{text}</a>,
  },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
  },
  {
    title: "Members",
    dataIndex: "members",
    key: "members",
    sorter: (a: any, b: any) => a.members - b.members,
    render: (members: number) => members.toLocaleString(),
  },
  {
    title: "Active %",
    dataIndex: "activePercentage",
    key: "activePercentage",
    sorter: (a: any, b: any) => a.activePercentage - b.activePercentage,
    render: (percentage: number) => (
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: `${percentage}%`,
            height: "8px",
            backgroundColor: getActivityColor(percentage),
            borderRadius: "4px",
            marginRight: "8px",
          }}
        />
        <span>{percentage}%</span>
      </div>
    ),
  },
  {
    title: "Last Activity",
    dataIndex: "lastActivity",
    key: "lastActivity",
  },
];

// Helper function to get color based on activity percentage
function getActivityColor(percentage: number) {
  if (percentage >= 80) return "#52c41a";
  if (percentage >= 60) return "#1890ff";
  if (percentage >= 40) return "#faad14";
  return "#ff4d4f";
}

// Colors for pie chart
const COLORS = ["#1890ff", "#52c41a", "#faad14", "#eb2f96", "#722ed1"];

export default function Membership() {
  const { data, loading } = uesGetUserAnalytics();
  const [dateRange, setDateRange] = useState<string>("7days");

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
  };

  const stats = data?.getUserAnalytics;

  return (
    <div
      style={{
        padding: "10px",
        minHeight: "100vh",
      }}
    >
      {/* Top Navigation Bar */}

      {/* Metric Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            loading={loading}
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              borderRadius: "8px",
              height: "100%",
            }}
            hoverable
          >
            <Statistic
              title="Total Members"
              value={stats?.totalMembers || 0}
              prefix={<TeamOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
            <Text
              type="secondary"
              style={{ display: "block", marginTop: "8px" }}
            >
              +{stats?.totalMembers}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              borderRadius: "8px",
              height: "100%",
            }}
            hoverable
          >
            <Statistic
              title="Verified Members"
              value={stats?.verifiedMembers || 0}
              prefix={
                <SafetyCertificateOutlined style={{ color: "#faad14" }} />
              }
              valueStyle={{ color: "#faad14" }}
            />
            <Text
              type="secondary"
              style={{ display: "block", marginTop: "8px" }}
            >
              {stats?.activePercent}% of total
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              borderRadius: "8px",
              height: "100%",
            }}
            hoverable
          >
            <Statistic
              title="Active Members"
              value={stats?.activeMembers || 0}
              prefix={<UserSwitchOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
            <Text
              type="secondary"
              style={{ display: "block", marginTop: "8px" }}
            >
              {stats?.activePercent}% of total
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              borderRadius: "8px",
              height: "100%",
            }}
            hoverable
          >
            <Statistic
              title="New Members (This Month)"
              value={stats?.newMembersThisMonth || 0}
              prefix={<UserOutlined style={{ color: "#eb2f96" }} />}
              valueStyle={{ color: "#eb2f96" }}
            />
            <Text
              type="secondary"
              style={{ display: "block", marginTop: "8px" }}
            >
              +${stats?.newMembersThisMonth} this month
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Charts - Second Row */}
      <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
        <Col xs={24} lg={12}>
          <Card
            title="Weekly Member Signups"
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              borderRadius: "8px",
              height: "100%",
            }}
          >
            <div style={{ height: "300px", width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklySignupsData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorSignups"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <RechartsTooltip />
                  <Area
                    type="monotone"
                    dataKey="signups"
                    stroke="#1890ff"
                    fillOpacity={1}
                    fill="url(#colorSignups)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="Members by Interest"
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              borderRadius: "8px",
              height: "100%",
            }}
          >
            <div style={{ height: "300px", width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={membersByInterestData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {membersByInterestData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts - Third Row */}
      <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
        <Col xs={24}>
          <Card
            title="Community Membership Performance"
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              borderRadius: "8px",
            }}
          >
            <Table
              dataSource={communityPerformanceData}
              columns={columns.filter(
                (col) =>
                  col.key === "name" ||
                  col.key === "slug" ||
                  col.key === "members" ||
                  col.key === "activePercentage"
              )}
              pagination={{ pageSize: 7 }}
              size="middle"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
