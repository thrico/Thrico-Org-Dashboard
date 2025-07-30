// Dashboard.tsx
"use client";
import React from "react";
import { Card, Col, Row, Statistic, Typography, Divider } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Line, Bar } from "@ant-design/plots";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const kpiData = [
    {
      title: "Monthly Active Users",
      value: 785,
      prefix: <ArrowUpOutlined />,
      color: "green",
      desc: "12% Increase",
    },
    {
      title: "Stickiness",
      value: 86,
      prefix: <ArrowUpOutlined />,
      color: "green",
      desc: "90% Increase",
    },
    {
      title: "Active Users (30d)",
      value: 4090,
      prefix: <ArrowDownOutlined />,
      color: "red",
      desc: "2% Decrease",
    },
    {
      title: "Avg Response Time",
      value: 245,
      suffix: "ms",
      prefix: <ClockCircleOutlined />,
      color: "green",
      desc: "5% Faster",
    },
  ];

  const lineConfig = {
    data: [
      { month: "Jan", value: 1200 },
      { month: "Feb", value: 1800 },
      { month: "Mar", value: 2000 },
      { month: "Apr", value: 2500 },
      { month: "May", value: 2600 },
      { month: "Jun", value: 2200 },
    ],
    xField: "month",
    yField: "value",
    smooth: true,
  };

  const barConfig = {
    data: [
      { module: "Feed", users: 1200 },
      { module: "Forum", users: 800 },
      { module: "Mentorship", users: 450 },
      { module: "Jobs", users: 300 },
      { module: "Communities", users: 700 },
    ],
    xField: "module",
    yField: "users",
    color: "#1677ff",
    label: { position: "middle", style: { fill: "#fff" } },
  };

  const modules = [
    "Memberships",
    "Feed",
    "Forum",
    "Forms",
    "Communities",
    "Mentorship",
    "Events",
    "Listing",
    "Job",
    "Offers",
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Analytics Dashboard</Title>

      <Row gutter={[16, 16]}>
        {kpiData.map((kpi) => (
          <Col xs={24} sm={12} md={6} key={kpi.title}>
            <Card>
              <Statistic
                title={kpi.title}
                value={kpi.value}
                prefix={kpi.prefix}
                suffix={kpi.suffix || ""}
                valueStyle={{ color: kpi.color }}
              />
              <div style={{ color: kpi.color }}>{kpi.desc}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider />

      <Card title="Monthly Active Trend">
        <Line {...lineConfig} />
      </Card>

      <Divider />

      <Card title="Module-wise User Activity">
        <Bar {...barConfig} />
      </Card>

      <Divider />

      <Row gutter={[16, 16]}>
        {modules.map((mod) => (
          <Col xs={24} sm={12} md={8} key={mod}>
            <Card title={mod} bordered>
              <Statistic
                title="Users Engaged"
                value={Math.floor(Math.random() * 1000)}
              />
              <Statistic
                title="Active Users (30d)"
                value={Math.floor(Math.random() * 500)}
              />
              <Statistic
                title="Drop-off %"
                value={Math.floor(Math.random() * 40)}
                suffix="%"
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
