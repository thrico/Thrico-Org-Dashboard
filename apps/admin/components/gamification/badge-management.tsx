"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Input,
  Form,
  Select,
  Switch,
  Tag,
  Modal,
  Table,
  Tabs,
  Progress,
  Typography,
  Space,
  Tooltip,
  Avatar,
  Statistic,
  Row,
  Col,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TrophyOutlined,
  UserOutlined,
  MessageOutlined,
  HeartOutlined,
  ShareAltOutlined,
  BarChartOutlined,
  CalendarOutlined,
  CrownOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import { BriefcaseBusinessIcon, TrendingUpDown } from "lucide-react";
import RankManagement from "./rank-management";
import CurrencyPointsManagement from "./currency-points-management";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Mock data for badges
const mockBadges = [
  {
    id: 1,
    name: "Comment Master",
    description: "100 comments on posts",
    icon: "💬",
    triggerType: "Milestone",
    ruleKey: "comment_feed",
    threshold: 100,
    pointsReward: 50,
    isActive: true,
    earnedCount: 45,
  },
  {
    id: 2,
    name: "First Post",
    description: "First time posting a feed",
    icon: "📝",
    triggerType: "First Time",
    ruleKey: "post_created",
    threshold: 1,
    pointsReward: 10,
    isActive: true,
    earnedCount: 234,
  },
  {
    id: 3,
    name: "Poll Voter Pro",
    description: "Voted on 10 polls",
    icon: "📊",
    triggerType: "Milestone",
    ruleKey: "vote_poll",
    threshold: 10,
    pointsReward: 20,
    isActive: true,
    earnedCount: 78,
  },
  {
    id: 4,
    name: "Admin Award",
    description: "Given manually by admin",
    icon: "👑",
    triggerType: "Manual",
    ruleKey: "",
    threshold: 0,
    pointsReward: 100,
    isActive: true,
    earnedCount: 12,
  },
];

const ruleKeys = [
  { value: "like_feed", label: "Like Feed", icon: <HeartOutlined /> },
  { value: "comment_feed", label: "Comment Feed", icon: <MessageOutlined /> },
  { value: "reshare_feed", label: "Reshare Feed", icon: <ShareAltOutlined /> },
  { value: "vote_poll", label: "Vote Poll", icon: <BarChartOutlined /> },
  { value: "post_created", label: "Post Created", icon: <EditOutlined /> },
  {
    value: "job_applied",
    label: "Job Applied",
    icon: <BriefcaseBusinessIcon />,
  },
  {
    value: "event_attended",
    label: "Event Attended",
    icon: <CalendarOutlined />,
  },
];

const triggerTypes = [
  { value: "first-time", label: "🔹 First-Time" },
  { value: "milestone", label: "🔹 Milestone" },
  { value: "manual", label: "🔹 Manual" },
  { value: "rule-based", label: "🔹 Rule-Based" },
];

export default function BadgeManagement() {
  const [badges, setBadges] = useState(mockBadges);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState(null);
  const [form] = Form.useForm();

  const handleCreateBadge = (values) => {
    const newBadge = {
      id: badges.length + 1,
      ...values,
      threshold: Number.parseInt(values.threshold) || 0,
      pointsReward: Number.parseInt(values.pointsReward) || 0,
      earnedCount: 0,
    };
    setBadges([...badges, newBadge]);
    setIsCreateModalOpen(false);
    form.resetFields();
  };

  const getTriggerTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "milestone":
        return "blue";
      case "first time":
        return "green";
      case "manual":
        return "purple";
      case "rule-based":
        return "orange";
      default:
        return "default";
    }
  };

  const badgeColumns = [
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => <span style={{ fontSize: "24px" }}>{icon}</span>,
    },
    {
      title: "Badge Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Trigger Type",
      dataIndex: "triggerType",
      key: "triggerType",
      render: (type) => <Tag color={getTriggerTypeColor(type)}>{type}</Tag>,
    },
    {
      title: "Rule Key",
      dataIndex: "ruleKey",
      key: "ruleKey",
      render: (ruleKey) => {
        if (!ruleKey) return "—";
        const rule = ruleKeys.find((r) => r.value === ruleKey);
        return <Tag>{rule?.label || ruleKey}</Tag>;
      },
    },
    {
      title: "Threshold",
      dataIndex: "threshold",
      key: "threshold",
      render: (threshold) => threshold || "—",
    },
    {
      title: "Points Reward",
      dataIndex: "pointsReward",
      key: "pointsReward",
      render: (points) => `+${points}`,
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "success" : "error"}>
          {isActive ? "✅" : "❌"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const userBadgeColumns = [
    {
      title: "Badge Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => <span style={{ fontSize: "24px" }}>{icon}</span>,
    },
    {
      title: "Badge Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Earned" ? "success" : "default"}>
          {status === "Earned" ? "✅ Earned" : "❌ Locked"}
        </Tag>
      ),
    },
    {
      title: "Earned At",
      dataIndex: "earnedAt",
      key: "earnedAt",
    },
  ];

  const userBadgeData = [
    {
      key: 1,
      icon: "💬",
      name: "Comment Master",
      status: "Earned",
      earnedAt: "2025-06-01",
    },
    {
      key: 2,
      icon: "📝",
      name: "First Post",
      status: "Earned",
      earnedAt: "2025-05-20",
    },
    {
      key: 3,
      icon: "📊",
      name: "Poll Voter Pro",
      status: "Locked",
      earnedAt: "—",
    },
  ];

  const tabItems = [
    {
      key: "badges",
      label: "Badge Library",
      children: (
        <Card>
          <div style={{ marginBottom: 16 }}>
            <Title level={4}>Badge Library ({badges.length} badges)</Title>
            <Text type="secondary">
              Manage your gamification badges and their trigger conditions
            </Text>
          </div>
          <Table
            columns={badgeColumns}
            dataSource={badges.map((badge) => ({ ...badge, key: badge.id }))}
            pagination={false}
          />
        </Card>
      ),
    },
    {
      key: "ranks",
      label: "Rank Management",
      children: <RankManagement />,
    },
    {
      key: "currency",
      label: "Currency & Points",
      children: <CurrencyPointsManagement />,
    },
    {
      key: "analytics",
      label: "Analytics",
      children: (
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <TrophyOutlined />
                <Title level={5} style={{ margin: 0 }}>
                  Most Earned Badges
                </Title>
              </div>
              <Space direction="vertical" style={{ width: "100%" }}>
                {badges
                  .sort((a, b) => b.earnedCount - a.earnedCount)
                  .slice(0, 3)
                  .map((badge) => (
                    <div
                      key={badge.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Space>
                        <span style={{ fontSize: "18px" }}>{badge.icon}</span>
                        <Text strong>{badge.name}</Text>
                      </Space>
                      <Tag>{badge.earnedCount}</Tag>
                    </div>
                  ))}
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <UserOutlined />
                <Title level={5} style={{ margin: 0 }}>
                  Recent Earners
                </Title>
              </div>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Space>
                    <Avatar style={{ backgroundColor: "#1890ff" }}>JS</Avatar>
                    <Text strong>John Smith</Text>
                  </Space>
                  <div style={{ textAlign: "right" }}>
                    <div>💬 Comment Master</div>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      2 hours ago
                    </Text>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Space>
                    <Avatar style={{ backgroundColor: "#52c41a" }}>AD</Avatar>
                    <Text strong>Alice Davis</Text>
                  </Space>
                  <div style={{ textAlign: "right" }}>
                    <div>📝 First Post</div>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      5 hours ago
                    </Text>
                  </div>
                </div>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <TrendingUpDown />
                <Title level={5} style={{ margin: 0 }}>
                  Close to Earning
                </Title>
              </div>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>Sunil - Comment Master</Text>
                    <Text>95/100</Text>
                  </div>
                  <Progress percent={95} size="small" />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>Maria - Poll Voter Pro</Text>
                    <Text>8/10</Text>
                  </div>
                  <Progress percent={80} size="small" />
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: "user-badges",
      label: "User Badges",
      children: (
        <Card>
          <Title level={4}>User Badge Viewer</Title>
          <Text type="secondary">View badges earned by individual users</Text>
          <Divider />
          <Space style={{ marginBottom: 16 }}>
            <Avatar size={48} style={{ backgroundColor: "#1890ff" }}>
              JS
            </Avatar>
            <div>
              <Title level={5} style={{ margin: 0 }}>
                John Smith
              </Title>
              <Text type="secondary">john.smith@example.com</Text>
            </div>
          </Space>
          <Table
            columns={userBadgeColumns}
            dataSource={userBadgeData}
            pagination={false}
          />
        </Card>
      ),
    },
  ];

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: 24 }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
          }}
        >
          <div>
            <Title
              level={2}
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              🏅 Badge Management
            </Title>
            <Paragraph type="secondary" style={{ marginTop: 8 }}>
              Define badges and attach them to predefined user actions to boost
              engagement.
            </Paragraph>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Badge
          </Button>
        </div>

        <Tabs items={tabItems} />

        {/* Create Badge Modal */}
        <Modal
          title="📝 Create New Badge"
          open={isCreateModalOpen}
          onCancel={() => {
            setIsCreateModalOpen(false);
            form.resetFields();
          }}
          footer={null}
          width={800}
        >
          <Text type="secondary">
            Define a new badge with trigger conditions and rewards
          </Text>
          <Divider />
          <Form form={form} layout="vertical" onFinish={handleCreateBadge}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Badge Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter badge name" },
                  ]}
                >
                  <Input placeholder="e.g., Comment Master" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Icon (Emoji)"
                  name="icon"
                  rules={[{ required: true, message: "Please enter an icon" }]}
                >
                  <Input placeholder="💬" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <TextArea placeholder="e.g., Awarded after commenting 100 times on feeds." />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Trigger Type"
                  name="triggerType"
                  rules={[
                    { required: true, message: "Please select trigger type" },
                  ]}
                >
                  <Select placeholder="Select trigger type">
                    {triggerTypes.map((type) => (
                      <Option key={type.value} value={type.value}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Rule Key"
                  name="ruleKey"
                  dependencies={["triggerType"]}
                >
                  <Select placeholder="Select rule key">
                    {ruleKeys.map((rule) => (
                      <Option key={rule.value} value={rule.value}>
                        <Space>
                          {rule.icon}
                          {rule.label}
                        </Space>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Threshold" name="threshold">
                  <Input type="number" placeholder="e.g., 100" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Point Bonus"
                  name="pointsReward"
                  rules={[
                    { required: true, message: "Please enter point bonus" },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Points earned when badge is awarded"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Repeatable"
                  name="repeatable"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Is Active"
                  name="isActive"
                  valuePropName="checked"
                  initialValue={true}
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
                marginTop: 24,
              }}
            >
              <Button onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save Badge
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
