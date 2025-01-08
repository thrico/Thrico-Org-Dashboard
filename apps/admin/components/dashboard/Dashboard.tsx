import React from "react";
import { Card, Row, Col, Typography, Statistic, Badge, Space } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Bar } from "@ant-design/plots";
import Kpis from "../../screen/comman/Kpis";
import Analytics from "./Analytics";
import AnalyticsChart from "./AnalyticsChart";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const metricData = [
    {
      title: "MAU",
      value: 785,
      badge: "Last 30 days",
      change: { value: 12, label: "increase", type: "positive" as "positive" },
    },
    {
      title: "Stickness",
      value: "86.57",
      badge: "Real-time",
      change: { value: 90, label: "increase", type: "positive" as "positive" },
    },
    {
      title: "Active",
      value: 4090,
      badge: "Last 28 days",
      change: { value: 2, label: "decrease", type: "negative" as "negative" },
    },
    {
      title: "Avg Response Time",
      value: 245,
      suffix: "ms",
      badge: "Last hour",
      change: { value: 5, label: "faster", type: "positive" as "positive" },
    },
  ];

  const activityData = [
    { day: "Mon", value: 60 },
    { day: "Tue", value: 80 },
    { day: "Wed", value: 65 },
    { day: "Thu", value: 85 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 45 },
    { day: "Sun", value: 35 },
  ];

  return (
    <div style={{ margin: "0 auto" }}>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <div>
          <Title level={2}>User Statistics</Title>
          <Text type="secondary">
            Activity metrics and user engagement data
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          {metricData.map((metric, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Kpis metric={metric} />
            </Col>
          ))}
        </Row>
      </Space>

      <AnalyticsChart />
      <Analytics />
    </div>
  );
};

export default Dashboard;
