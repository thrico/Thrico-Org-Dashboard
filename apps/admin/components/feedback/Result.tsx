"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Layout,
  Modal,
  Row,
  Space,
  Statistic,
  Tabs,
  Typography,
} from "antd";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { poll } from "./ts-types";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function PollResultsPage({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState("summary");

  // Mock data for the poll
  const poll = {
    id: 1,
    title: "Favorite Feature Poll",
    question: "What's your favorite feature?",
    votes: 87,
    participationRate: "82%",
    averageTime: "28s",
    createdAt: "1 day ago",
    lastVote: "10 minutes ago",
  };

  // Mock data for poll options
  const optionsData = [
    { name: "Dashboard", value: 35 },
    { name: "Analytics", value: 25 },
    { name: "Form Builder", value: 20 },
    { name: "Integrations", value: 15 },
    { name: "API", value: 5 },
  ];

  // Mock data for individual votes
  const individualVotes = [
    {
      id: 1,
      voter: "Anonymous",
      date: "May 23, 2024, 4:32 PM",
      vote: "Dashboard",
    },
    {
      id: 2,
      voter: "Anonymous",
      date: "May 23, 2024, 3:15 PM",
      vote: "Analytics",
    },
    {
      id: 3,
      voter: "Anonymous",
      date: "May 23, 2024, 1:45 PM",
      vote: "Form Builder",
    },
  ];

  const colors = ["#1890ff", "#52c41a", "#722ed1", "#fa8c16", "#f5222d"];

  return (
    <Modal
      title={poll.title}
      open={open}
      onCancel={onClose}
      footer={null}
      width={1200}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "24px", background: "#f5f5f5" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Votes"
                    value={poll.votes}
                    suffix={
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        +12 from yesterday
                      </Text>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Participation Rate"
                    value={poll.participationRate}
                    suffix={
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        +5% from last poll
                      </Text>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Avg. Time to Vote"
                    value={poll.averageTime}
                    suffix={
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        -3s from last poll
                      </Text>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Leading Option"
                    value={
                      optionsData.sort((a, b) => b.value - a.value)[0].name
                    }
                    suffix={
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {Math.round(
                          (optionsData.sort((a, b) => b.value - a.value)[0]
                            .value /
                            optionsData.reduce(
                              (acc, curr) => acc + curr.value,
                              0
                            )) *
                            100
                        )}
                        % of votes
                      </Text>
                    }
                  />
                </Card>
              </Col>
            </Row>

            <div style={{ marginTop: 24 }}>
              <Tabs defaultActiveKey="summary" onChange={setActiveTab}>
                <TabPane tab="Summary" key="summary">
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <Card
                      title={poll.question}
                      extra={`${poll.votes} total votes`}
                    >
                      <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                          <div style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={optionsData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                  }
                                >
                                  {optionsData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={colors[index % colors.length]}
                                    />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </Col>
                        <Col xs={24} md={12}>
                          <Title level={5}>Vote Breakdown</Title>
                          <Space direction="vertical" style={{ width: "100%" }}>
                            {optionsData.map((option, index) => (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 12,
                                      height: 12,
                                      borderRadius: "50%",
                                      backgroundColor:
                                        colors[index % colors.length],
                                      marginRight: 8,
                                    }}
                                  />
                                  <span>{option.name}</span>
                                </div>
                                <div>
                                  <Text strong>{option.value}</Text>
                                  <Text
                                    type="secondary"
                                    style={{ marginLeft: 8 }}
                                  >
                                    (
                                    {Math.round(
                                      (option.value /
                                        optionsData.reduce(
                                          (acc, curr) => acc + curr.value,
                                          0
                                        )) *
                                        100
                                    )}
                                    %)
                                  </Text>
                                </div>
                              </div>
                            ))}
                          </Space>
                        </Col>
                      </Row>
                    </Card>

                    <Card title="Vote Distribution" extra="Votes by option">
                      <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            layout="vertical"
                            data={optionsData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <XAxis type="number" />
                            <YAxis
                              dataKey="name"
                              type="category"
                              scale="band"
                              width={100}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                              {optionsData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={colors[index % colors.length]}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </Card>
                  </Space>
                </TabPane>

                <TabPane tab="Individual Votes" key="votes">
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Title level={5}>Individual Votes</Title>
                      <Button icon={<FilterOutlined />}>Filter</Button>
                    </div>

                    <Card title="All Votes" extra="Individual vote details">
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <thead>
                          <tr>
                            <th
                              style={{
                                padding: "12px 8px",
                                textAlign: "left",
                                borderBottom: "1px solid #f0f0f0",
                              }}
                            >
                              Voter
                            </th>
                            <th
                              style={{
                                padding: "12px 8px",
                                textAlign: "left",
                                borderBottom: "1px solid #f0f0f0",
                              }}
                            >
                              Vote
                            </th>
                            <th
                              style={{
                                padding: "12px 8px",
                                textAlign: "left",
                                borderBottom: "1px solid #f0f0f0",
                              }}
                            >
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {individualVotes.map((vote) => (
                            <tr key={vote.id}>
                              <td
                                style={{
                                  padding: "12px 8px",
                                  borderBottom: "1px solid #f0f0f0",
                                }}
                              >
                                {vote.voter}
                              </td>
                              <td
                                style={{
                                  padding: "12px 8px",
                                  borderBottom: "1px solid #f0f0f0",
                                }}
                              >
                                {vote.vote}
                              </td>
                              <td
                                style={{
                                  padding: "12px 8px",
                                  borderBottom: "1px solid #f0f0f0",
                                }}
                              >
                                {vote.date}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card>
                  </Space>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Content>
      </Layout>
    </Modal>
  );
}
