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
  Statistic,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DollarOutlined,
  StarOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { TrendingUpIcon } from "lucide-react";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Mock data for currencies
const mockCurrencies = [
  {
    id: 1,
    name: "Alumni Thrive Coins",
    symbol: "AT",
    description: "Primary virtual currency for the platform",
    icon: "🪙",
    exchangeRate: 100, // points per 1 currency unit
    totalSupply: 50000,
    circulatingSupply: 35000,
    isActive: true,
    canEarn: true,
    canSpend: true,
  },
  {
    id: 2,
    name: "Premium Tokens",
    symbol: "PT",
    description: "Special currency for premium features",
    icon: "💎",
    exchangeRate: 500, // points per 1 currency unit
    totalSupply: 10000,
    circulatingSupply: 2500,
    isActive: true,
    canEarn: false,
    canSpend: true,
  },
];

// Mock data for point activities
const mockPointActivities = [
  {
    id: 1,
    category: "Social Engagement",
    activity: "Like Feed Post",
    points: 1,
    dailyLimit: 50,
    description: "Earn points for liking posts",
    isActive: true,
    multiplier: 1.0,
  },
  {
    id: 2,
    category: "Social Engagement",
    activity: "Comment on Post",
    points: 2,
    dailyLimit: 25,
    description: "Earn points for commenting",
    isActive: true,
    multiplier: 1.0,
  },
  {
    id: 3,
    category: "Content Creation",
    activity: "Create Feed Post",
    points: 5,
    dailyLimit: 10,
    description: "Earn points for creating content",
    isActive: true,
    multiplier: 1.5,
  },
  {
    id: 4,
    category: "Events",
    activity: "Attend Event",
    points: 20,
    dailyLimit: 5,
    description: "Earn points for event attendance",
    isActive: true,
    multiplier: 2.0,
  },
  {
    id: 5,
    category: "Profile",
    activity: "Complete Profile",
    points: 50,
    dailyLimit: 1,
    description: "One-time bonus for profile completion",
    isActive: true,
    multiplier: 1.0,
  },
];

// Mock data for spending options
const mockSpendingOptions = [
  {
    id: 1,
    name: "Profile Boost",
    description: "Highlight your profile for 7 days",
    cost: 100,
    currency: "AT",
    category: "Profile Enhancement",
    isActive: true,
    purchaseCount: 45,
  },
  {
    id: 2,
    name: "Event Priority Access",
    description: "Get priority registration for events",
    cost: 50,
    currency: "AT",
    category: "Event Perks",
    isActive: true,
    purchaseCount: 23,
  },
  {
    id: 3,
    name: "Custom Badge",
    description: "Create a custom badge for your profile",
    cost: 5,
    currency: "PT",
    category: "Customization",
    isActive: true,
    purchaseCount: 12,
  },
  {
    id: 4,
    name: "Mentorship Session",
    description: "Book a 1-on-1 mentorship session",
    cost: 200,
    currency: "AT",
    category: "Learning",
    isActive: true,
    purchaseCount: 8,
  },
];

const activityCategories = [
  "Social Engagement",
  "Content Creation",
  "Events",
  "Profile",
  "Learning",
  "Networking",
  "Mentorship",
];

export default function CurrencyPointsManagement() {
  const [currencies, setCurrencies] = useState(mockCurrencies);
  const [pointActivities, setPointActivities] = useState(mockPointActivities);
  const [spendingOptions, setSpendingOptions] = useState(mockSpendingOptions);
  const [isCreateCurrencyModalOpen, setIsCreateCurrencyModalOpen] =
    useState(false);
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  const [isCreateSpendingModalOpen, setIsCreateSpendingModalOpen] =
    useState(false);
  const [currencyForm] = Form.useForm();
  const [activityForm] = Form.useForm();
  const [spendingForm] = Form.useForm();

  const handleCreateCurrency = (values) => {
    const newCurrency = {
      id: currencies.length + 1,
      ...values,
      exchangeRate: Number.parseInt(values.exchangeRate) || 0,
      totalSupply: Number.parseInt(values.totalSupply) || 0,
      circulatingSupply: 0,
    };
    setCurrencies([...currencies, newCurrency]);
    setIsCreateCurrencyModalOpen(false);
    currencyForm.resetFields();
  };

  const handleCreateActivity = (values) => {
    const newActivity = {
      id: pointActivities.length + 1,
      ...values,
      points: Number.parseInt(values.points) || 0,
      dailyLimit: Number.parseInt(values.dailyLimit) || 0,
      multiplier: Number.parseFloat(values.multiplier) || 1.0,
    };
    setPointActivities([...pointActivities, newActivity]);
    setIsCreateActivityModalOpen(false);
    activityForm.resetFields();
  };

  const handleCreateSpending = (values) => {
    const newSpending = {
      id: spendingOptions.length + 1,
      ...values,
      cost: Number.parseInt(values.cost) || 0,
      purchaseCount: 0,
    };
    setSpendingOptions([...spendingOptions, newSpending]);
    setIsCreateSpendingModalOpen(false);
    spendingForm.resetFields();
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Social Engagement": "blue",
      "Content Creation": "green",
      Events: "purple",
      Profile: "orange",
      Learning: "red",
      Networking: "gold",
      Mentorship: "cyan",
    };
    return colors[category] || "default";
  };

  const activityColumns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color={getCategoryColor(category)}>{category}</Tag>
      ),
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      render: (points) => <Tag>+{points}</Tag>,
    },
    {
      title: "Daily Limit",
      dataIndex: "dailyLimit",
      key: "dailyLimit",
      render: (limit) => `${limit}/day`,
    },
    {
      title: "Multiplier",
      dataIndex: "multiplier",
      key: "multiplier",
      render: (multiplier) =>
        multiplier !== 1.0 ? <Tag color="orange">×{multiplier}</Tag> : null,
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
      render: () => (
        <Space>
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      key: "currencies",
      label: "Currencies",
      children: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Title level={4}>Virtual Currencies</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateCurrencyModalOpen(true)}
              style={{ backgroundColor: "#faad14" }}
            >
              Create Currency
            </Button>
          </div>
          <Row gutter={[16, 16]}>
            {currencies.map((currency) => (
              <Col key={currency.id} xs={24} md={12}>
                <Card
                  style={{ opacity: currency.isActive ? 1 : 0.5 }}
                  actions={[
                    <EditOutlined key="edit" />,
                    <DeleteOutlined key="delete" />,
                  ]}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span style={{ fontSize: "24px" }}>{currency.icon}</span>
                      <div>
                        <Title level={5} style={{ margin: 0 }}>
                          {currency.name}
                        </Title>
                        <Text type="secondary">{currency.symbol}</Text>
                      </div>
                    </div>
                  </div>
                  <Paragraph type="secondary">{currency.description}</Paragraph>
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={12}>
                      <Text type="secondary">Exchange Rate</Text>
                      <div>
                        <Text strong>
                          {currency.exchangeRate} points = 1 {currency.symbol}
                        </Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary">Supply</Text>
                      <div>
                        <Text strong>
                          {currency.circulatingSupply.toLocaleString()} /{" "}
                          {currency.totalSupply.toLocaleString()}
                        </Text>
                      </div>
                    </Col>
                  </Row>
                  <div style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <Text>Circulation</Text>
                      <Text>
                        {Math.round(
                          (currency.circulatingSupply / currency.totalSupply) *
                            100
                        )}
                        %
                      </Text>
                    </div>
                    <Progress
                      percent={
                        (currency.circulatingSupply / currency.totalSupply) *
                        100
                      }
                      size="small"
                    />
                  </div>
                  <Space wrap>
                    {currency.canEarn && <Tag color="success">Earnable</Tag>}
                    {currency.canSpend && (
                      <Tag color="processing">Spendable</Tag>
                    )}
                    {currency.isActive && <Tag>Active</Tag>}
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
    {
      key: "points",
      label: "Point Activities",
      children: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Title level={4}>Point Earning Activities</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateActivityModalOpen(true)}
            >
              Add Activity
            </Button>
          </div>
          <Card>
            <Table
              columns={activityColumns}
              dataSource={pointActivities.map((activity) => ({
                ...activity,
                key: activity.id,
              }))}
              pagination={false}
            />
          </Card>
        </div>
      ),
    },
    {
      key: "spending",
      label: "Spending Options",
      children: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Title level={4}>Currency Spending Options</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateSpendingModalOpen(true)}
              style={{ backgroundColor: "#52c41a" }}
            >
              Add Spending Option
            </Button>
          </div>
          <Row gutter={[16, 16]}>
            {spendingOptions.map((option) => (
              <Col key={option.id} xs={24} sm={12} lg={8}>
                <Card
                  style={{ opacity: option.isActive ? 1 : 0.5 }}
                  actions={[
                    <EditOutlined key="edit" />,
                    <DeleteOutlined key="delete" />,
                  ]}
                >
                  <Title level={5}>{option.name}</Title>
                  <Paragraph type="secondary">{option.description}</Paragraph>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <Tag color="gold">
                      {option.cost} {option.currency}
                    </Tag>
                    <Tag>{option.category}</Tag>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <ShoppingCartOutlined />
                    <Text type="secondary">
                      {option.purchaseCount} purchases
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
    {
      key: "analytics",
      label: "Economics",
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Points Earned"
                  value={1234567}
                  prefix={<StarOutlined />}
                  suffix="+12%"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Currency in Circulation"
                  value="37,500 AT"
                  prefix={<DollarOutlined />}
                  suffix="75%"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Active Users"
                  value={2345}
                  prefix={<UserOutlined />}
                  suffix="+8%"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Avg. Daily Spending"
                  value="456 AT"
                  prefix={<TrendingUpIcon />}
                  suffix="+3%"
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card>
                <Title level={5}>Top Point Earning Activities</Title>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {pointActivities
                    .sort((a, b) => b.points - a.points)
                    .slice(0, 5)
                    .map((activity) => (
                      <div
                        key={activity.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Space>
                          <Tag color={getCategoryColor(activity.category)}>
                            {activity.category}
                          </Tag>
                          <Text strong>{activity.activity}</Text>
                        </Space>
                        <Tag>+{activity.points} pts</Tag>
                      </div>
                    ))}
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card>
                <Title level={5}>Popular Spending Options</Title>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {spendingOptions
                    .sort((a, b) => b.purchaseCount - a.purchaseCount)
                    .slice(0, 5)
                    .map((option) => (
                      <div
                        key={option.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text strong>{option.name}</Text>
                        <Space>
                          <Tag>{option.purchaseCount} purchases</Tag>
                          <Tag color="gold">
                            {option.cost} {option.currency}
                          </Tag>
                        </Space>
                      </div>
                    ))}
                </Space>
              </Card>
            </Col>
          </Row>

          <Card style={{ marginTop: 16 }}>
            <Title level={5}>Currency Exchange Rates</Title>
            <Text type="secondary">
              Current point-to-currency conversion rates
            </Text>
            <Divider />
            <Row gutter={[16, 16]}>
              {currencies.map((currency) => (
                <Col key={currency.id} xs={24} md={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 16,
                      border: "1px solid #d9d9d9",
                      borderRadius: 8,
                    }}
                  >
                    <Space>
                      <span style={{ fontSize: "24px" }}>{currency.icon}</span>
                      <div>
                        <Text strong>{currency.name}</Text>
                        <br />
                        <Text type="secondary">{currency.symbol}</Text>
                      </div>
                    </Space>
                    <div style={{ textAlign: "right" }}>
                      <Text strong>{currency.exchangeRate} points</Text>
                      <br />
                      <Text type="secondary">= 1 {currency.symbol}</Text>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title
          level={3}
          style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}
        >
          <DollarOutlined />
          Currency & Points Management
        </Title>
        <Text type="secondary">
          Configure virtual currencies, point systems, and rewards
        </Text>
      </div>

      <Tabs items={tabItems} />

      {/* Create Currency Modal */}
      <Modal
        title="🪙 Create New Currency"
        open={isCreateCurrencyModalOpen}
        onCancel={() => {
          setIsCreateCurrencyModalOpen(false);
          currencyForm.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Text type="secondary">
          Define a new virtual currency for your platform
        </Text>
        <Divider />
        <Form
          form={currencyForm}
          layout="vertical"
          onFinish={handleCreateCurrency}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Currency Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter currency name" },
                ]}
              >
                <Input placeholder="e.g., Alumni Thrive Coins" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Symbol"
                name="symbol"
                rules={[{ required: true, message: "Please enter symbol" }]}
              >
                <Input placeholder="e.g., AT" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea placeholder="Describe the purpose of this currency" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Icon (Emoji)"
                name="icon"
                rules={[{ required: true, message: "Please enter an icon" }]}
              >
                <Input placeholder="🪙" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Exchange Rate (Points per 1 unit)"
                name="exchangeRate"
                rules={[
                  { required: true, message: "Please enter exchange rate" },
                ]}
              >
                <Input type="number" placeholder="100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Total Supply"
                name="totalSupply"
                rules={[
                  { required: true, message: "Please enter total supply" },
                ]}
              >
                <Input type="number" placeholder="50000" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Can Earn"
                name="canEarn"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Can Spend"
                name="canSpend"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
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
            <Button onClick={() => setIsCreateCurrencyModalOpen(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create Currency
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Create Activity Modal */}
      <Modal
        title="⭐ Create Point Activity"
        open={isCreateActivityModalOpen}
        onCancel={() => {
          setIsCreateActivityModalOpen(false);
          activityForm.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Text type="secondary">Define how users can earn points</Text>
        <Divider />
        <Form
          form={activityForm}
          layout="vertical"
          onFinish={handleCreateActivity}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select placeholder="Select category">
                  {activityCategories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Activity Name"
                name="activity"
                rules={[
                  { required: true, message: "Please enter activity name" },
                ]}
              >
                <Input placeholder="e.g., Like Feed Post" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea placeholder="Describe this activity" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Points Earned"
                name="points"
                rules={[{ required: true, message: "Please enter points" }]}
              >
                <Input type="number" placeholder="5" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Daily Limit"
                name="dailyLimit"
                rules={[
                  { required: true, message: "Please enter daily limit" },
                ]}
              >
                <Input type="number" placeholder="10" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Multiplier"
                name="multiplier"
                initialValue="1.0"
              >
                <Input type="number" step="0.1" placeholder="1.0" />
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
            <Button onClick={() => setIsCreateActivityModalOpen(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create Activity
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Create Spending Option Modal */}
      <Modal
        title="🛒 Create Spending Option"
        open={isCreateSpendingModalOpen}
        onCancel={() => {
          setIsCreateSpendingModalOpen(false);
          spendingForm.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Text type="secondary">
          Define what users can purchase with currency
        </Text>
        <Divider />
        <Form
          form={spendingForm}
          layout="vertical"
          onFinish={handleCreateSpending}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Item Name"
                name="name"
                rules={[{ required: true, message: "Please enter item name" }]}
              >
                <Input placeholder="e.g., Profile Boost" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select placeholder="Select category">
                  <Option value="Profile Enhancement">
                    Profile Enhancement
                  </Option>
                  <Option value="Event Perks">Event Perks</Option>
                  <Option value="Customization">Customization</Option>
                  <Option value="Learning">Learning</Option>
                  <Option value="Networking">Networking</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea placeholder="Describe what this purchase provides" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Cost"
                name="cost"
                rules={[{ required: true, message: "Please enter cost" }]}
              >
                <Input type="number" placeholder="100" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Currency"
                name="currency"
                rules={[{ required: true, message: "Please select currency" }]}
              >
                <Select placeholder="Select currency">
                  {currencies.map((currency) => (
                    <Option key={currency.id} value={currency.symbol}>
                      {currency.icon} {currency.name} ({currency.symbol})
                    </Option>
                  ))}
                </Select>
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
            <Button onClick={() => setIsCreateSpendingModalOpen(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create Spending Option
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
