"use client";

import { Card, Typography, Button, Row, Col, Space, List } from "antd";
import {
  ShopOutlined,
  MessageOutlined,
  GlobalOutlined,
  UserOutlined,
  ShoppingOutlined,
  PhoneOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function PricingPage() {
  const plans = [
    {
      id: "basic",
      title: "Basic",
      subtitle: "For solo entrepreneurs",
      originalPrice: "$25",

      popular: true,

      features: [
        { icon: <ShopOutlined />, text: "1-500 Members" },
        { icon: <MessageOutlined />, text: "4 Admin Users" },
        {
          icon: <GlobalOutlined />,
          text: "Web",
        },
      ],
      buttonText: "Select Basic",
    },
    {
      id: "grow",
      title: "Grow",
      subtitle: "For small teams",
      price: "₹5,599",

      features: [
        { icon: <ShopOutlined />, text: "1-500 Members" },
        { icon: <MessageOutlined />, text: "4 Admin Users" },
        {
          icon: <GlobalOutlined />,
          text: "Web",
        },
      ],
      buttonText: "Select Grow",
    },
    {
      id: "advanced",
      title: "Advanced",
      subtitle: "As your business scales",
      price: "₹22,680",

      cardRate: "0.6%",
      features: [
        { icon: <ShopOutlined />, text: "1-500 Members" },
        { icon: <MessageOutlined />, text: "4 Admin Users" },
        {
          icon: <GlobalOutlined />,
          text: "Web + Mobile",
        },
      ],
      buttonText: "Select Advanced",
    },
    {
      id: "plus",
      title: "Plus",
      subtitle: "For more complex businesses",
      price: "₹175,000",

      features: [
        { icon: <ShopOutlined />, text: "100000+ Members" },
        { icon: <MessageOutlined />, text: "4 Admin Users" },
        {
          icon: <GlobalOutlined />,
          text: "Web + Mobile",
        },
      ],
      buttonText: "Select Plus",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "40px 20px",
        minHeight: "100vh",
      }}
    >
      <Row gutter={[16, 16]} justify="center">
        {plans.map((plan) => (
          <Col xs={24} sm={12} lg={6} key={plan.id}>
            <Card
              style={{
                height: "100%",
                borderRadius: 8,
                backgroundColor: plan.popular ? "#f0f5ff" : "white",
              }}
              bodyStyle={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    backgroundColor: "#f0f5ff",
                    padding: "8px 0",
                    textAlign: "center",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    marginTop: -24,
                    marginLeft: -24,
                    marginRight: -24,
                    marginBottom: 16,
                    position: "absolute",
                  }}
                >
                  {/* <Text strong>Most popular</Text> */}
                </div>
              )}

              <Title level={3} style={{ marginTop: 0, marginBottom: 4 }}>
                {plan.title}
              </Title>
              <Text
                type="secondary"
                style={{ marginBottom: 24, display: "block" }}
              >
                {plan.subtitle}
              </Text>

              <div>
                <Text type="secondary">Starting at</Text>
                <div style={{ marginTop: 8, marginBottom: 16 }}>
                  <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                    {plan.price}
                  </Text>
                  <Text type="secondary" style={{ marginLeft: 4 }}>
                    {plan.id !== "plus" ? "INR/month" : "INR/month"}
                  </Text>
                </div>
              </div>

              <Button type="primary" block>
                {plan.buttonText}
              </Button>

              <List
                itemLayout="horizontal"
                dataSource={plan.features}
                renderItem={(item) => (
                  <List.Item style={{ padding: "8px 0", borderBottom: "none" }}>
                    <Space align="start">
                      <span style={{ color: "#595959", marginTop: 3 }}>
                        {item.icon}
                      </span>
                      <Text>{item.text}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
