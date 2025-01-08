import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Badge, Card, Col, Space, Statistic, Typography } from "antd";
import React from "react";
const { Title, Text } = Typography;
interface Metric {
  title: string;
  badge: number | string;
  value: number;
  suffix?: string;
  change: {
    type: "positive" | "negative";
    value: number;
    label: string;
  };
}

function Kpis({ metric }: { metric: Metric }) {
  return (
    <Card>
      <Statistic
        title={
          <Space>
            {metric.title}
            <Badge
              count={metric.badge}
              style={{ backgroundColor: "#52c41a" }}
            />
          </Space>
        }
        value={metric.value}
        suffix={metric.suffix}
        precision={metric.title === "Error Rate" ? 2 : 0}
      />
      <div style={{ marginTop: 8 }}>
        {metric.change.type === "positive" ? (
          <ArrowUpOutlined style={{ color: "#52c41a" }} />
        ) : (
          <ArrowDownOutlined style={{ color: "#ff4d4f" }} />
        )}
        <Text
          style={{
            color: metric.change.type === "positive" ? "#52c41a" : "#ff4d4f",
            marginLeft: 4,
          }}
        >
          {metric.change.value}% {metric.change.label}
        </Text>
      </div>
    </Card>
  );
}

export default Kpis;
