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
  Row,
  Col,
  Divider,
  Avatar,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CrownOutlined,
  UserOutlined,
  TrophyOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { TrendingUpDownIcon } from "lucide-react";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Mock data for ranks
const mockRanks = [
  {
    id: 1,
    name: "Diamond",
    description: "The highest achievable rank",
    icon: "💎",
    color: "#B9F2FF",
    requirementType: "badges",
    badgeRequirement: 500,
    pointRequirement: 15000,
    currencyReward: 1000,
    currencyName: "Alumni Thrive Coins",
    currencySymbol: "AT",
    isActive: true,
    order: 1,
    userCount: 12,
  },
  {
    id: 2,
    name: "Emerald",
    description: "Elite level achievement",
    icon: "💚",
    color: "#50C878",
    requirementType: "badges",
    badgeRequirement: 400,
    pointRequirement: 10000,
    currencyReward: 750,
    currencyName: "Alumni Thrive Coins",
    currencySymbol: "AT",
    isActive: true,
    order: 2,
    userCount: 28,
  },
  {
    id: 3,
    name: "Sapphire",
    description: "Advanced community member",
    icon: "💙",
    color: "#0F52BA",
    requirementType: "badges",
    badgeRequirement: 300,
    pointRequirement: 5000,
    currencyReward: 500,
    currencyName: "Alumni Thrive Coins",
    currencySymbol: "AT",
    isActive: true,
    order: 3,
    userCount: 45,
  },
  {
    id: 4,
    name: "Topaz",
    description: "Experienced contributor",
    icon: "🟡",
    color: "#FFC87C",
    requirementType: "badges",
    badgeRequirement: 200,
    pointRequirement: 4000,
    currencyReward: 300,
    currencyName: "Alumni Thrive Coins",
    currencySymbol: "AT",
    isActive: true,
    order: 4,
    userCount: 67,
  },
  {
    id: 5,
    name: "Pearl",
    description: "Active community member",
    icon: "🤍",
    color: "#F8F6F0",
    requirementType: "badges",
    badgeRequirement: 100,
    pointRequirement: 3000,
    currencyReward: 200,
    currencyName: "Alumni Thrive Coins",
    currencySymbol: "AT",
    isActive: true,
    order: 5,
    userCount: 89,
  },
  {
    id: 6,
    name: "Bronze",
    description: "Getting started",
    icon: "🥉",
    color: "#CD7F32",
    requirementType: "badges",
    badgeRequirement: 2,
    pointRequirement: 100,
    currencyReward: 50,
    currencyName: "Alumni Thrive Coins",
    currencySymbol: "AT",
    isActive: true,
    order: 6,
    userCount: 234,
  },
  {
    id: 7,
    name: "Explorer",
    description: "New member",
    icon: "🔍",
    color: "#808080",
    requirementType: "points",
    badgeRequirement: 0,
    pointRequirement: 0,
    currencyReward: 0,
    currencyName: "Alumni Thrive Coins",
    currencySymbol: "AT",
    isActive: true,
    order: 7,
    userCount: 156,
  },
];

const requirementTypes = [
  { value: "points", label: "Points Based" },
  { value: "badges", label: "Badge Based" },
  { value: "hybrid", label: "Points + Badges" },
  { value: "manual", label: "Manual Assignment" },
];

export default function RankManagement() {
  const [ranks, setRanks] = useState(
    mockRanks.sort((a, b) => a.order - b.order)
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRank, setEditingRank] = useState(null);
  const [form] = Form.useForm();

  const handleCreateRank = (values) => {
    const newRank = {
      id: ranks.length + 1,
      ...values,
      badgeRequirement: Number.parseInt(values.badgeRequirement) || 0,
      pointRequirement: Number.parseInt(values.pointRequirement) || 0,
      currencyReward: Number.parseInt(values.currencyReward) || 0,
      order: ranks.length + 1,
      userCount: 0,
    };
    setRanks([...ranks, newRank]);
    setIsCreateModalOpen(false);
    form.resetFields();
  };

  const handleEditRank = (rank) => {
    setEditingRank(rank);
    form.setFieldsValue({
      name: rank.name,
      description: rank.description,
      icon: rank.icon,
      color: rank.color,
      requirementType: rank.requirementType,
      badgeRequirement: rank.badgeRequirement.toString(),
      pointRequirement: rank.pointRequirement.toString(),
      currencyReward: rank.currencyReward.toString(),
      currencyName: rank.currencyName,
      currencySymbol: rank.currencySymbol,
      isActive: rank.isActive,
    });
    setIsCreateModalOpen(true);
  };

  const handleUpdateRank = (values) => {
    const updatedRanks = ranks.map((rank) =>
      rank.id === editingRank.id
        ? {
            ...rank,
            ...values,
            badgeRequirement: Number.parseInt(values.badgeRequirement) || 0,
            pointRequirement: Number.parseInt(values.pointRequirement) || 0,
            currencyReward: Number.parseInt(values.currencyReward) || 0,
          }
        : rank
    );
    setRanks(updatedRanks);
    setIsCreateModalOpen(false);
    setEditingRank(null);
    form.resetFields();
  };

  const moveRank = (rankId, direction) => {
    const rankIndex = ranks.findIndex((r) => r.id === rankId);
    if (
      (direction === "up" && rankIndex === 0) ||
      (direction === "down" && rankIndex === ranks.length - 1)
    ) {
      return;
    }

    const newRanks = [...ranks];
    const targetIndex = direction === "up" ? rankIndex - 1 : rankIndex + 1;

    // Swap the ranks
    [newRanks[rankIndex], newRanks[targetIndex]] = [
      newRanks[targetIndex],
      newRanks[rankIndex],
    ];

    // Update order values
    newRanks.forEach((rank, index) => {
      rank.order = index + 1;
    });

    setRanks(newRanks);
  };

  const getRequirementDisplay = (rank) => {
    switch (rank.requirementType) {
      case "points":
        return `${rank.pointRequirement} points`;
      case "badges":
        return `${rank.badgeRequirement} badges`;
      case "hybrid":
        return `${rank.pointRequirement} points + ${rank.badgeRequirement} badges`;
      case "manual":
        return "Manual assignment";
      default:
        return "—";
    }
  };

  const rankColumns = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      render: (order, record, index) => (
        <Space>
          <Text code>#{order}</Text>
          <Space direction="vertical" size={0}>
            <Button
              type="text"
              size="small"
              icon={<ArrowUpOutlined />}
              onClick={() => moveRank(record.id, "up")}
              disabled={index === 0}
            />
            <Button
              type="text"
              size="small"
              icon={<ArrowDownOutlined />}
              onClick={() => moveRank(record.id, "down")}
              disabled={index === ranks.length - 1}
            />
          </Space>
        </Space>
      ),
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon, record) => (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: record.color + "40",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          {icon}
        </div>
      ),
    },
    {
      title: "Rank Name",
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
      title: "Requirements",
      key: "requirements",
      render: (_, record) => <Tag>{getRequirementDisplay(record)}</Tag>,
    },
    {
      title: "Currency Reward",
      key: "currencyReward",
      render: (_, record) =>
        record.currencyReward > 0 ? (
          <Tag color="gold">
            +{record.currencyReward} {record.currencySymbol}
          </Tag>
        ) : null,
    },
    {
      title: "Users",
      dataIndex: "userCount",
      key: "userCount",
      render: (count) => <Tag color="blue">{count}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "success" : "error"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditRank(record)}
          />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      key: "hierarchy",
      label: "Rank Hierarchy",
      children: (
        <Card>
          <Title level={4}>Rank Hierarchy ({ranks.length} ranks)</Title>
          <Text type="secondary">Manage rank order and requirements</Text>
          <Divider />
          <Table
            columns={rankColumns}
            dataSource={ranks.map((rank) => ({ ...rank, key: rank.id }))}
            pagination={false}
          />
        </Card>
      ),
    },
    {
      key: "progression",
      label: "Rank Progression",
      children: (
        <Card>
          <Title level={4}>Rank Progression Visualization</Title>
          <Text type="secondary">
            Visual representation of the ranking system
          </Text>
          <Divider />
          <Row gutter={[16, 16]} justify="center">
            {ranks.map((rank, index) => (
              <Col key={rank.id} xs={12} sm={8} md={6} lg={4}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ position: "relative", marginBottom: 16 }}>
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        backgroundColor: rank.color + "20",
                        border: `4px solid ${rank.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "32px",
                        margin: "0 auto",
                      }}
                    >
                      {rank.icon}
                    </div>
                  </div>
                  <Title level={5} style={{ margin: 0 }}>
                    {rank.name}
                  </Title>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {getRequirementDisplay(rank)}
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {rank.userCount} users
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      ),
    },
    {
      key: "analytics",
      label: "Rank Analytics",
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
                <UserOutlined />
                <Title level={5} style={{ margin: 0 }}>
                  Rank Distribution
                </Title>
              </div>
              <Space direction="vertical" style={{ width: "100%" }}>
                {ranks.slice(0, 5).map((rank) => (
                  <div key={rank.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <Space>
                        <span>{rank.icon}</span>
                        <Text>{rank.name}</Text>
                      </Space>
                      <Text>{rank.userCount} users</Text>
                    </div>
                    <Progress
                      percent={(rank.userCount / 234) * 100}
                      size="small"
                    />
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
                <TrendingUpDownIcon />
                <Title level={5} style={{ margin: 0 }}>
                  Recent Promotions
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
                    <Avatar style={{ backgroundColor: "#1890ff" }}>AM</Avatar>
                    <Text strong>Alice Miller</Text>
                  </Space>
                  <div style={{ textAlign: "right" }}>
                    <div>💎 Diamond</div>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      1 day ago
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
                    <Avatar style={{ backgroundColor: "#52c41a" }}>BJ</Avatar>
                    <Text strong>Bob Johnson</Text>
                  </Space>
                  <div style={{ textAlign: "right" }}>
                    <div>💚 Emerald</div>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      3 days ago
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
                <TrophyOutlined />
                <Title level={5} style={{ margin: 0 }}>
                  Promotion Candidates
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
                    <Text>Sarah - To Sapphire</Text>
                    <Text>285/300 badges</Text>
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
                    <Text>Mike - To Topaz</Text>
                    <Text>180/200 badges</Text>
                  </div>
                  <Progress percent={90} size="small" />
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
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
            level={3}
            style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}
          >
            <CrownOutlined />
            Rank Management
          </Title>
          <Text type="secondary">Define and manage user ranking system</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
          style={{ backgroundColor: "#722ed1" }}
        >
          Create New Rank
        </Button>
      </div>

      <Tabs items={tabItems} />

      {/* Create/Edit Rank Modal */}
      <Modal
        title={editingRank ? "👑 Edit Rank" : "👑 Create New Rank"}
        open={isCreateModalOpen}
        onCancel={() => {
          setIsCreateModalOpen(false);
          setEditingRank(null);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Text type="secondary">
          {editingRank
            ? "Update rank configuration"
            : "Define a new rank with requirements and rewards"}
        </Text>
        <Divider />
        <Form
          form={form}
          layout="vertical"
          onFinish={editingRank ? handleUpdateRank : handleCreateRank}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Rank Name"
                name="name"
                rules={[{ required: true, message: "Please enter rank name" }]}
              >
                <Input placeholder="e.g., Diamond" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Icon (Emoji)"
                name="icon"
                rules={[{ required: true, message: "Please enter an icon" }]}
              >
                <Input placeholder="💎" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea placeholder="e.g., The highest achievable rank" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Rank Color"
                name="color"
                rules={[{ required: true, message: "Please select a color" }]}
              >
                <Input type="color" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Requirement Type"
                name="requirementType"
                rules={[
                  { required: true, message: "Please select requirement type" },
                ]}
              >
                <Select placeholder="Select requirement type">
                  {requirementTypes.map((type) => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Points Required" name="pointRequirement">
                <Input type="number" placeholder="e.g., 1000" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Badges Required" name="badgeRequirement">
                <Input type="number" placeholder="e.g., 50" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Currency Reward" name="currencyReward">
                <Input type="number" placeholder="e.g., 100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Currency Name" name="currencyName">
                <Input placeholder="Alumni Thrive Coins" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Currency Symbol" name="currencySymbol">
                <Input placeholder="AT" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Is Active"
            name="isActive"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 24,
            }}
          >
            <Button onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingRank ? "Update Rank" : "Create Rank"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
