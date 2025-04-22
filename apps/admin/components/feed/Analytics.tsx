import { BarChartOutlined, LineChartOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  List,
  Modal,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";

const currentFeed = {
  id: 2,
  author: {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "UX Designer",
    verified: false,
  },
  timePosted: "12 hours ago",
  visibility: "public",
  content: {
    text: "Just finished my latest design project!",
    description:
      "Really excited to share this new dashboard design with everyone. Let me know what you think!",
    image: "/placeholder.svg?height=400&width=600",
  },
  stats: {
    likes: 78,
    comments: 23,
    shares: 5,
    views: 845,
  },
};
const feedData = [
  {
    id: 1,
    author: {
      name: "Pankaj Verma",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Software Developer",
      verified: true,
    },
    timePosted: "6 hours ago",
    visibility: "public",
    content: {
      text: "Google",
      description: "Google to Migrate Ad Tech Stack to JavaScript!",
      image: "/placeholder.svg?height=400&width=600",
    },
    stats: {
      likes: 42,
      comments: 8,
      shares: 12,
      views: 1024,
    },
  },
  {
    id: 2,
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "UX Designer",
      verified: false,
    },
    timePosted: "12 hours ago",
    visibility: "public",
    content: {
      text: "Just finished my latest design project!",
      description:
        "Really excited to share this new dashboard design with everyone. Let me know what you think!",
      image: "/placeholder.svg?height=400&width=600",
    },
    stats: {
      likes: 78,
      comments: 23,
      shares: 5,
      views: 845,
    },
  },
  {
    id: 3,
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Product Manager",
      verified: true,
    },
    timePosted: "1 day ago",
    visibility: "private",
    content: {
      text: "Team update",
      description:
        "We've hit our quarterly goals! Great job everyone on the team for your hard work and dedication.",
      image: null,
    },
    stats: {
      likes: 56,
      comments: 14,
      shares: 3,
      views: 320,
    },
  },
];
const getAnalyticsData = (feedId: number) => {
  const feed = feedData.find((f) => f.id === feedId);
  if (!feed) return null;

  return {
    engagement: [
      { name: "Likes", value: feed.stats.likes, color: "#ff4d4f" },
      { name: "Comments", value: feed.stats.comments, color: "#1890ff" },
      { name: "Shares", value: feed.stats.shares, color: "#52c41a" },
    ],
    demographics: {
      age: [
        { group: "18-24", percentage: 35 },
        { group: "25-34", percentage: 45 },
        { group: "35-44", percentage: 15 },
        { group: "45+", percentage: 5 },
      ],
      location: [
        { country: "United States", percentage: 40 },
        { country: "India", percentage: 30 },
        { country: "Europe", percentage: 20 },
        { country: "Other", percentage: 10 },
      ],
    },
    reachData: {
      total: feed.stats.views,
      organic: Math.floor(feed.stats.views * 0.7),
      paid: Math.floor(feed.stats.views * 0.3),
    },
  };
};
const { Text, Paragraph } = Typography;
const Analytics = () => {
  const analyticsData = currentFeed.id
    ? getAnalyticsData(currentFeed.id)
    : null;

  const [analyticsVisible, setAnalyticsVisible] = useState(false);

  const showModal = () => {
    setAnalyticsVisible(true);
  };

  const handleOk = () => {
    setAnalyticsVisible(false);
  };

  const handleCancel = () => {
    setAnalyticsVisible(false);
  };

  return (
    <>
      <Button onClick={showModal} type="text" icon={<BarChartOutlined />}>
        Analytics
      </Button>
      <Modal
        centered
        style={{ paddingTop: 0 }}
        title={
          <>
            <>Post Analytics</>
          </>
        }
        open={analyticsVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div>
          <Divider orientation="left">Engagement Overview</Divider>
          <Row gutter={16}>
            {analyticsData?.engagement.map((item) => (
              <Col span={8} key={item.name}>
                <Card variant="borderless">
                  <Statistic
                    title={item.name}
                    value={item.value}
                    valueStyle={{ color: item.color }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <Divider orientation="left">Reach</Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Card variant="borderless">
                <Statistic
                  title="Total Views"
                  value={analyticsData?.reachData.total}
                  prefix={<LineChartOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card variant="borderless">
                <Statistic
                  title="Organic Reach"
                  value={analyticsData?.reachData.organic}
                  suffix={`(${Math.round((analyticsData?.reachData.organic / analyticsData?.reachData.total) * 100)}%)`}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card variant="borderless">
                <Statistic
                  title="Paid Reach"
                  value={analyticsData?.reachData.paid}
                  suffix={`(${Math.round((analyticsData?.reachData?.paid / analyticsData?.reachData?.total) * 100)}%)`}
                />
              </Card>
            </Col>
          </Row>

          <Divider orientation="left">Demographics</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Age Distribution" variant="borderless">
                <List
                  dataSource={analyticsData?.demographics.age}
                  renderItem={(item) => (
                    <List.Item>
                      <Text>{item.group}</Text>
                      <div>
                        <div
                          style={{
                            width: `${item.percentage}%`,
                            height: 8,
                            background: "#1890ff",
                            borderRadius: 4,
                          }}
                        />
                        <Text type="secondary">{item.percentage}%</Text>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Geographic Distribution" variant="borderless">
                <List
                  dataSource={analyticsData?.demographics?.location}
                  renderItem={(item) => (
                    <List.Item>
                      <Text>{item.country}</Text>
                      <div>
                        <div
                          style={{
                            width: `${item.percentage}%`,
                            height: 8,
                            background: "#52c41a",
                            borderRadius: 4,
                          }}
                        />
                        <Text type="secondary">{item.percentage}%</Text>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default Analytics;
