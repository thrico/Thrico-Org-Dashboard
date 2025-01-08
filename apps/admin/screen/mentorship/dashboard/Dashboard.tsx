import React from "react";
import { Card, Row, Col, Typography, Statistic, Badge, Space } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Bar } from "@ant-design/plots";
import { ActiveMentor } from "./ActiveMentor";
import Kpis from "../../comman/Kpis";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const metricData = [
    {
      title: "Total Activities",
      value: 14847,
      badge: "Last 30 days",
      change: { value: 12, label: "increase", type: "positive" },
    },
    {
      title: "Active Mentor",
      value: 1249,
      badge: "Real-time",
      change: { value: 8, label: "increase", type: "positive" },
    },
    {
      title: "Error Rate",
      value: 0.12,
      badge: "Last 24h",
      change: { value: 2, label: "decrease", type: "negative" },
    },
    {
      title: "Avg Response Time",
      value: 245,
      suffix: "ms",
      badge: "Last hour",
      change: { value: 5, label: "faster", type: "positive" },
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
    <div style={{ padding: 24, margin: "0 auto" }}>
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

        <Card title="Activity Distribution">
          <Bar
            data={activityData}
            xField="day"
            yField="value"
            color="#1890ff"
            label={{
              position: "top",
              style: {
                fill: "#8c8c8c",
                opacity: 0.6,
              },
            }}
            xAxis={{
              label: {
                autoHide: true,
                autoRotate: false,
              },
            }}
          />
        </Card>
        <ActiveMentor />
      </Space>
    </div>
  );
};

export default Dashboard;
