"use client";

import { useState } from "react";
import {
  Alert,
  Badge,
  Card,
  Switch,
  Button,
  Typography,
  Space,
  Divider,
  Row,
  Col,
} from "antd";
import {
  CheckOutlined,
  WarningOutlined,
  UserOutlined,
  GlobalOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { getCountryPackage } from "../../../../graphql/actions/plan";

const { Title, Text, Paragraph } = Typography;

export default function PricingPage() {
  const { data, loading } = getCountryPackage();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly"
  );

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 16px",
  };

  const trialSummaryCardStyle = {
    backgroundColor: "#FFF9F0",
    borderColor: "#FFE7BA",
    marginBottom: "24px",
  };

  const iconCircleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#F5703C",
    color: "white",
    marginRight: "8px",
    fontSize: "18px",
  };

  const planCardStyle = {
    height: "100%",
  };

  const standardCardStyle = {
    height: "100%",
    borderColor: "#1677ff",
  };

  const customPlanCardStyle = {
    backgroundColor: "#F9F0FF",
    borderColor: "#EFDBFF",
    textAlign: "center" as const,
  };

  const featureItemStyle = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "8px",
  };

  const iconStyle = {
    marginRight: "8px",
    marginTop: "4px",
  };

  const priceStyle = {
    margin: 0,
    fontSize: "32px",
    fontWeight: "bold",
  };

  const billingToggleStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "16px",
    marginTop: "16px",
  };

  const customPlanFeaturesStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    margin: "16px 0",
    flexWrap: "wrap" as const,
  };

  const customFeatureStyle = {
    display: "flex",
    alignItems: "center",
  };

  const dotStyle = {
    width: "8px",
    height: "8px",
    backgroundColor: "#666",
    borderRadius: "50%",
    marginRight: "8px",
  };

  return (
    <div style={containerStyle}>
      {/* Expired Trial Alert */}
      <Alert
        message={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ fontWeight: "bold" }}>
                Your 14-day trial has expired!
              </span>
              <div>
                Your account has been suspended 3 days ago. Select a plan to
                continue using Thrico.
              </div>
            </div>
            <span style={{ fontSize: "24px" }}>🔒</span>
          </div>
        }
        type="error"
        showIcon
        icon={<WarningOutlined />}
        style={{ marginBottom: "24px" }}
      />

      {/* Trial Summary */}
      <Card style={trialSummaryCardStyle}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <div style={iconCircleStyle}>
            <span>!</span>
          </div>
          <Title level={4} style={{ margin: 0 }}>
            Your Trial Summary
          </Title>
        </div>
        <Text type="secondary">
          Here's what you accomplished during your trial
        </Text>

        <Row gutter={24} style={{ marginTop: "24px", textAlign: "center" }}>
          <Col span={8}>
            <Title level={2} style={{ color: "#F5703C", margin: 0 }}>
              14
            </Title>
            <Text type="secondary">Days of Trial</Text>
          </Col>
          <Col span={8}>
            <Title level={2} style={{ color: "#F5703C", margin: 0 }}>
              45
            </Title>
            <Text type="secondary">Team Members Added</Text>
          </Col>
          <Col span={8}>
            <Title level={2} style={{ color: "#F5703C", margin: 0 }}>
              3
            </Title>
            <Text type="secondary">Features Used</Text>
          </Col>
        </Row>
      </Card>

      {/* Choose Plan Section */}
      <div style={{ marginBottom: "24px" }}>
        <Title level={4}>Choose Your Plan</Title>
        <Text type="secondary">
          Select a plan to reactivate your account and continue using Thrico
        </Text>

        <div style={billingToggleStyle}>
          <Text style={{ marginRight: "8px" }}>Monthly</Text>
          <Switch
            checked={billingCycle === "yearly"}
            onChange={(checked) =>
              setBillingCycle(checked ? "yearly" : "monthly")
            }
          />
          <Text style={{ marginLeft: "8px" }}>Yearly</Text>
          <Badge
            count="Save up to 10%"
            style={{ backgroundColor: "#52c41a", marginLeft: "8px" }}
          />
        </div>

        <Row gutter={16}>
          {/* Basic Plan */}
          <Col xs={24} md={8}>
            <Card bordered style={planCardStyle}>
              <Title level={4}>Basic</Title>
              <div style={{ marginBottom: "16px" }}>
                <Title level={2} style={priceStyle}>
                  $270
                </Title>
                <Text type="secondary">/year</Text>
              </div>
              <Text type="secondary">₹22,950 per year</Text>
              <div style={{ margin: "8px 0" }}>
                <Badge
                  count="Save $30 (10%)"
                  style={{ backgroundColor: "#52c41a" }}
                />
              </div>

              <Divider />

              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <div style={featureItemStyle}>
                  <UserOutlined style={{ ...iconStyle, color: "#1677ff" }} />
                  <Text>
                    <strong>1-500</strong> team members
                  </Text>
                </div>
                <div style={featureItemStyle}>
                  <UserOutlined style={{ ...iconStyle, color: "#1677ff" }} />
                  <Text>
                    <strong>2</strong> admin users
                  </Text>
                </div>
                <div style={featureItemStyle}>
                  <GlobalOutlined style={{ ...iconStyle, color: "#1677ff" }} />
                  <Text>Web only</Text>
                </div>

                <Divider style={{ margin: "12px 0" }} />

                <div style={featureItemStyle}>
                  <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                  <Text>Web Dashboard</Text>
                </div>
                <div style={featureItemStyle}>
                  <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                  <Text>Basic Analytics</Text>
                </div>
                <div style={featureItemStyle}>
                  <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                  <Text>Email Support</Text>
                </div>
                <div style={featureItemStyle}>
                  <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                  <Text>5GB Storage</Text>
                </div>
              </Space>

              <Button
                type="primary"
                block
                style={{
                  marginTop: "24px",
                  backgroundColor: "#000",
                  borderColor: "#000",
                }}
              >
                Get Started with Basic
              </Button>
            </Card>
          </Col>

          {/* Standard Plan */}
          <Col xs={24} md={8}>
            <Badge.Ribbon text="Most Popular" color="#1677ff">
              <Card bordered style={standardCardStyle}>
                <Title level={4}>Standard</Title>
                <div style={{ marginBottom: "16px" }}>
                  <Title level={2} style={priceStyle}>
                    $2160
                  </Title>
                  <Text type="secondary">/year</Text>
                </div>
                <Text type="secondary">₹189,000 per year</Text>
                <div style={{ margin: "8px 0" }}>
                  <Badge
                    count="Save $240 (10%)"
                    style={{ backgroundColor: "#52c41a" }}
                  />
                </div>

                <Divider />

                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  <div style={featureItemStyle}>
                    <UserOutlined style={{ ...iconStyle, color: "#1677ff" }} />
                    <Text>
                      <strong>501-2,000</strong> team members
                    </Text>
                  </div>
                  <div style={featureItemStyle}>
                    <UserOutlined style={{ ...iconStyle, color: "#1677ff" }} />
                    <Text>
                      <strong>4</strong> admin users
                    </Text>
                  </div>
                  <div style={featureItemStyle}>
                    <GlobalOutlined
                      style={{ ...iconStyle, color: "#1677ff" }}
                    />
                    <Text>Web only</Text>
                  </div>

                  <Divider style={{ margin: "12px 0" }} />

                  <div style={featureItemStyle}>
                    <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                    <Text>Everything in Basic</Text>
                  </div>
                  <div style={featureItemStyle}>
                    <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                    <Text>Advanced Analytics</Text>
                  </div>
                  <div style={featureItemStyle}>
                    <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                    <Text>Priority Support</Text>
                  </div>
                  <div style={featureItemStyle}>
                    <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                    <Text>Custom Reports</Text>
                  </div>
                  <div style={featureItemStyle}>
                    <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                    <Text>50GB Storage</Text>
                  </div>
                </Space>

                <Button type="primary" block style={{ marginTop: "24px" }}>
                  Get Started with Standard
                </Button>
              </Card>
            </Badge.Ribbon>
          </Col>

          {/* Professional Plan */}
          <Col xs={24} md={8}>
            <Card bordered style={planCardStyle}>
              <Title level={4}>Professional</Title>
              <div style={{ marginBottom: "16px" }}>
                <Title level={2} style={priceStyle}>
                  $3240
                </Title>
                <Text type="secondary">/year</Text>
              </div>
              <Text type="secondary">₹275,400 per year</Text>
              <div style={{ margin: "8px 0" }}>
                <Badge
                  count="Save $360 (10%)"
                  style={{ backgroundColor: "#52c41a" }}
                />
              </div>

              <Divider />

              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <div style={featureItemStyle}>
                  <UserOutlined style={{ ...iconStyle, color: "#1677ff" }} />
                  <Text>
                    <strong>2,001-5,000</strong> team members
                  </Text>
                </div>
                <div style={featureItemStyle}>
                  <UserOutlined style={{ ...iconStyle, color: "#1677ff" }} />
                  <Text>
                    <strong>6</strong> admin users
                  </Text>
                </div>
                <div style={featureItemStyle}>
                  <GlobalOutlined style={{ ...iconStyle, color: "#1677ff" }} />
                  <MobileOutlined
                    style={{
                      marginLeft: "4px",
                      marginRight: "8px",
                      color: "#1677ff",
                    }}
                  />
                  <Text>Web + Mobile App</Text>
                </div>

                <Divider style={{ margin: "12px 0" }} />

                <div style={featureItemStyle}>
                  <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                  <Text>Everything in Standard</Text>
                </div>
                <div style={featureItemStyle}>
                  <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                  <Text>Mobile App Access</Text>
                </div>
                <div style={featureItemStyle}>
                  <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                  <Text>API Access</Text>
                </div>
                <div style={featureItemStyle}>
                  <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                  <Text>24/7 Support</Text>
                </div>
                <div style={featureItemStyle}>
                  <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                  <Text>200GB Storage</Text>
                </div>
                <div style={featureItemStyle}>
                  <CheckOutlined style={{ ...iconStyle, color: "#52c41a" }} />
                  <Text>Custom Integrations</Text>
                </div>
              </Space>

              <Button
                type="primary"
                block
                style={{
                  marginTop: "24px",
                  backgroundColor: "#000",
                  borderColor: "#000",
                }}
              >
                Get Started with Professional
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Custom Plan Section */}
      <Card style={customPlanCardStyle}>
        <Title level={4}>Need a Custom Plan?</Title>
        <Paragraph>
          For teams with 100,000+ members or special requirements
        </Paragraph>

        <div style={customPlanFeaturesStyle}>
          <div style={customFeatureStyle}>
            <div style={dotStyle}></div>
            <Text>Unlimited team members</Text>
          </div>
          <div style={customFeatureStyle}>
            <div style={dotStyle}></div>
            <Text>Custom integrations</Text>
          </div>
          <div style={customFeatureStyle}>
            <div style={dotStyle}></div>
            <Text>Dedicated support</Text>
          </div>
        </div>

        <Button
          type="primary"
          style={{
            backgroundColor: "white",
            borderColor: "#722ED1",
            color: "#722ED1",
          }}
        >
          Contact Sales Team
        </Button>
      </Card>
    </div>
  );
}
