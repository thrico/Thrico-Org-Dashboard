"use client";

import React from "react";
import { Card, Avatar, List, Typography, Space, Row, Col } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Area } from "@ant-design/plots";

const { Text, Title } = Typography;

export default function Component() {
  // Sample data for sparkline charts
  const sparklineData = {
    companies: [30, 35, 40, 45, 50, 58],
    contacts: [1000, 1100, 1150, 1200, 1250, 1286],
    deals: [40, 38, 36, 35, 33, 34],
  };

  const upcomingEvents = [
    {
      time: "Today, 5pm - 6pm",
      title: "Team Meeting",
      color: "#1677ff",
    },
    {
      time: "Tomorrow, All Day",
      title: "Product Demonstration Webinar",
      color: "#722ed1",
    },
    {
      time: "August 28, 8am - 11am",
      title: "Evaluation Meeting",
      color: "#13c2c2",
    },
    {
      time: "August 28, 8am - 11am",
      title: "Sales Pitch Presentation",
      color: "#fa8c16",
    },
    {
      time: "August 30 - September 7",
      title: "Conference Week",
      color: "#f5222d",
    },
  ];

  const activities = [
    {
      avatar: "/placeholder.svg",
      name: "Cheyenne Kenter",
      action: "moved",
      task: "Cloud Functionality",
      target: "Completed",
      time: "5 minutes ago",
      status: "🎉",
    },
    {
      avatar: "/placeholder.svg",
      name: "Sterling Cooper",
      action: "billed quote",
      amount: "$16,850.00",
      time: "3 hours ago",
      logo: "/placeholder.svg",
    },
    {
      avatar: "/placeholder.svg",
      name: "Chance Philips",
      action: "moved",
      task: "Enterprise Planning",
      target: "Completed",
      time: "5 minutes ago",
      status: "🎉",
    },
    {
      avatar: "/placeholder.svg",
      name: "Mira Bothman",
      action: "moved the",
      task: "DB Audit",
      deal: "Initech",
      target: "Won",
      time: "Yesterday at 4:35pm",
    },
    {
      avatar: "/placeholder.svg",
      name: "James Stanton",
      action: "added",
      task: "Market Research",
      target: "Backlog",
      time: "August 14 at 11:24am",
    },
  ];

  const SparklineChart = ({
    data,
    color,
  }: {
    data: number[];
    color: string;
  }) => (
    <Area
      data={data.map((value, idx) => ({ x: idx, y: value }))}
      height={50}
      autoFit
      smooth
      xAxis={false}
      yAxis={false}
      tooltip={false}
      line={{
        color: color,
      }}
      areaStyle={{
        fill: `l(270) 0:${color}00 1:${color}20`,
      }}
    />
  );

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card bodyStyle={{ backgroundColor: "rgba(24, 144, 255, 0.05)" }}>
            <Space direction="vertical" size="small">
              <Text type="secondary">Number of Users</Text>
              <Space align="baseline">
                <Title level={2} style={{ margin: 0 }}>
                  58
                </Title>
                <Space>
                  <SwapOutlined style={{ color: "#1677ff" }} />
                  <Text type="secondary">
                    18% <span style={{ fontSize: 12 }}>/month</span>
                  </Text>
                </Space>
              </Space>
            </Space>
            <div style={{ marginTop: 8 }}>
              <SparklineChart data={sparklineData.companies} color="#1677ff" />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card bodyStyle={{ backgroundColor: "rgba(82, 196, 26, 0.05)" }}>
            <Space direction="vertical" size="small">
              <Text type="secondary">Number of Feed</Text>
              <Space align="baseline">
                <Title level={2} style={{ margin: 0 }}>
                  1.286
                </Title>
                <Space>
                  <ArrowUpOutlined style={{ color: "#52c41a" }} />
                  <Text type="secondary">
                    22% <span style={{ fontSize: 12 }}>/month</span>
                  </Text>
                </Space>
              </Space>
            </Space>
            <div style={{ marginTop: 8 }}>
              <SparklineChart data={sparklineData.contacts} color="#52c41a" />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card bodyStyle={{ backgroundColor: "rgba(255, 77, 79, 0.05)" }}>
            <Space direction="vertical" size="small">
              <Text type="secondary">Total deals in pipeline</Text>
              <Space align="baseline">
                <Title level={2} style={{ margin: 0 }}>
                  34
                </Title>
                <Space>
                  <ArrowDownOutlined style={{ color: "#ff4d4f" }} />
                  <Text type="secondary">
                    8% <span style={{ fontSize: 12 }}>/month</span>
                  </Text>
                </Space>
              </Space>
            </Space>
            <div style={{ marginTop: 8 }}>
              <SparklineChart data={sparklineData.deals} color="#ff4d4f" />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Upcoming events
              </Space>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={upcomingEvents}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: item.color,
                      }}
                    />
                    <Space direction="vertical" size={0}>
                      <Text type="secondary">{item.time}</Text>
                      <Text strong>{item.title}</Text>
                    </Space>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Latest activities
              </Space>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={activities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                      <Space size={4}>
                        <Text strong>{item.name}</Text>
                        <Text type="secondary">{item.time}</Text>
                      </Space>
                    }
                    description={
                      <Space size={4}>
                        <Text>{item.action}</Text>
                        {"amount" in item ? (
                          <Text strong>{item.amount}</Text>
                        ) : (
                          <>
                            <Text strong>{item.task}</Text>
                            {item.deal && (
                              <>
                                <Text>deal for</Text>
                                <Text strong>{item.deal}</Text>
                              </>
                            )}
                            <Text>to</Text>
                            <Text type="success">{item.target}</Text>
                            {item.status && <Text>{item.status}</Text>}
                          </>
                        )}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
