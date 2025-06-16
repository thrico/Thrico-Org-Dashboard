"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Alert,
  Space,
  Typography,
  Row,
  Col,
  Select,
  List,
  Divider,
} from "antd";
import {
  CrownOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  StopOutlined,
  CheckOutlined,
  ArrowRightOutlined,
  StarOutlined,
  ThunderboltOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import BuyPlan from "../../components/settings/plan/buy-plan/BuyPlan";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Component() {
  const [status, setStatus] = useState<"cancelled" | "suspended" | "pending">(
    "pending"
  );

  const statusConfig = {
    cancelled: {
      type: "error" as const,
      icon: <StopOutlined />,
      message: "Subscription Cancelled",
      description:
        "Your subscription has been cancelled. Reactivate to continue using premium features.",
      action: "Reactivate Now",
    },
    suspended: {
      type: "warning" as const,
      icon: <ExclamationCircleOutlined />,
      message: "Account Suspended",
      description:
        "Your account is temporarily suspended. Please resolve payment issues to continue.",
      action: "Update Payment",
    },
    pending: {
      type: "info" as const,
      icon: <ClockCircleOutlined />,
      message: "Subscription Pending",
      description:
        "Your subscription is being processed. You currently have limited access.",
      action: "Complete Setup",
    },
  };

  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for individuals getting started",
      icon: <StarOutlined style={{ fontSize: "24px", color: "#1890ff" }} />,
      features: [
        "5 Projects",
        "Basic Analytics",
        "Email Support",
        "1GB Storage",
        "Basic Templates",
      ],
      buttonText: "Choose Starter",
      popular: false,
      color: "#1890ff",
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Best for growing businesses",
      icon: (
        <ThunderboltOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
      ),
      features: [
        "Unlimited Projects",
        "Advanced Analytics",
        "Priority Support",
        "10GB Storage",
        "Premium Templates",
        "Team Collaboration",
        "API Access",
      ],
      buttonText: "Choose Professional",
      popular: true,
      color: "#52c41a",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations",
      icon: <RocketOutlined style={{ fontSize: "24px", color: "#722ed1" }} />,
      features: [
        "Everything in Professional",
        "Custom Integrations",
        "Dedicated Support",
        "Unlimited Storage",
        "White-label Solution",
        "Advanced Security",
        "SLA Guarantee",
      ],
      buttonText: "Contact Sales",
      popular: false,
      color: "#722ed1",
    },
  ];

  const currentConfig = statusConfig[status];

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      {/* Demo Status Selector */}

      {/* Banner */}
      <div
        style={{
          padding: "24px",
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Alert
            type={currentConfig.type}
            showIcon
            icon={currentConfig.icon}
            message={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Text strong style={{ fontSize: "16px" }}>
                    {currentConfig.message}
                  </Text>
                  <div style={{ marginTop: "4px" }}>
                    <Text>{currentConfig.description}</Text>
                  </div>
                </div>
                <Button type="primary" icon={<ArrowRightOutlined />}>
                  {currentConfig.action}
                </Button>
              </div>
            }
            style={{
              padding: "16px 24px",
              borderRadius: "8px",
              border: `2px solid`,
            }}
          />
        </div>
      </div>

      <BuyPlan />
    </div>
  );
}
