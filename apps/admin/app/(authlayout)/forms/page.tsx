"use client";
import {
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  Progress,
  List,
  Tag,
  Space,
} from "antd";
import {
  FileTextOutlined,
  CheckCircleOutlined,
  UserOutlined,
  BarChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// Mock data for the dashboard
const stats = [
  {
    title: "Total Forms",
    value: 24,
    icon: <FileTextOutlined />,
    change: 12,
    trend: "up",
  },
  {
    title: "Total Submissions",
    value: 1254,
    icon: <CheckCircleOutlined />,
    change: 8.5,
    trend: "up",
  },
  {
    title: "Active Users",
    value: 342,
    icon: <UserOutlined />,
    change: 2.1,
    trend: "down",
  },
  {
    title: "Completion Rate",
    value: 78,
    suffix: "%",
    icon: <BarChartOutlined />,
    change: 5.3,
    trend: "up",
  },
];

// Mock data for recent forms
const recentForms = [
  { id: 1, name: "Customer Feedback", submissions: 124, status: "Published" },
  { id: 2, name: "Event Registration", submissions: 87, status: "Published" },
  { id: 3, name: "Product Survey", submissions: 56, status: "Draft" },
  { id: 4, name: "Employee Satisfaction", submissions: 0, status: "Draft" },
];

export default function Dashboard() {
  return (
    <div style={{ marginTop: 30 }}>
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Dashboard
        </Title>
        <Text type="secondary">
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                suffix={stat.suffix}
                prefix={
                  <div
                    style={{ marginRight: 8, color: "#1677ff", fontSize: 24 }}
                  >
                    {stat.icon}
                  </div>
                }
              />
              <div
                style={{ marginTop: 8, display: "flex", alignItems: "center" }}
              >
                {stat.trend === "up" ? (
                  <ArrowUpOutlined style={{ color: "#52c41a" }} />
                ) : (
                  <ArrowDownOutlined style={{ color: "#ff4d4f" }} />
                )}
                <Text
                  style={{
                    marginLeft: 4,
                    color: stat.trend === "up" ? "#52c41a" : "#ff4d4f",
                  }}
                >
                  {stat.change}%
                </Text>
                <Text type="secondary" style={{ marginLeft: 4 }}>
                  from last month
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <Card title="Recent Forms">
            <List
              dataSource={recentForms}
              renderItem={(form) => (
                <List.Item
                  actions={[
                    <Tag
                      color={
                        form.status === "Published" ? "success" : "warning"
                      }
                      key="status"
                    >
                      {form.status}
                    </Tag>,
                  ]}
                >
                  <List.Item.Meta
                    title={form.name}
                    description={`${form.submissions} submissions`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Form Completion Rates">
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Customer Feedback</Text>
                  <Text strong>85%</Text>
                </div>
                <Progress percent={85} showInfo={false} />
              </div>

              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Event Registration</Text>
                  <Text strong>72%</Text>
                </div>
                <Progress percent={72} showInfo={false} />
              </div>

              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Product Survey</Text>
                  <Text strong>64%</Text>
                </div>
                <Progress percent={64} showInfo={false} />
              </div>

              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Employee Satisfaction</Text>
                  <Text strong>91%</Text>
                </div>
                <Progress percent={91} showInfo={false} />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
