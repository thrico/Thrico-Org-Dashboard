import React, { useState } from "react";

import {
  Card,
  Button,
  Switch,
  Row,
  Col,
  Space,
  Tag,
  Divider,
  Badge,
  Flex,
} from "antd";
import {
  getCountryPackage,
  updateTrialToPackage,
  verifyRazorpayPayment,
} from "../../../../graphql/actions/plan";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { Typography } from "antd";
import { CheckOutlined, UserOutlined } from "@ant-design/icons";
import PaymentLoading from "../Loading";
import { checkEntitySubscription } from "../../../../graphql/actions";
import { on } from "events";
import { CountryPackage } from "../ts-types";
import { cardStyle } from "../stye";
import { allPlanPercentage, formatPrice, getYearlySavings } from "../utils";
import {
  ShieldAlertIcon,
  ShieldEllipsis,
  TabletSmartphone,
  Users2Icon,
} from "lucide-react";
import CustomRequestForm from "../CustomRequest/Form";
import BuyPlanPopUp from "./BuyPlanPop";
const { Title, Text, Paragraph } = Typography;
const BuyPlan = () => {
  const { data, loading } = getCountryPackage();
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [activePackage, setActivePackage] = useState<CountryPackage | null>(
    null
  );
  return (
    <>
      <Card loading={loading}>
        <Title level={2}>Choose Your Plan</Title>
        <Paragraph type="secondary">
          Select the perfect plan for your business needs
        </Paragraph>
        <Space align="center" style={{ marginBottom: 32 }}>
          <Text strong={!isYearly}>Monthly</Text>
          <Switch checked={isYearly} onChange={setIsYearly} />
          <Text strong={isYearly}>Yearly</Text>
          <Tag color="blue">
            Save up to {"  "} {allPlanPercentage(data?.getCountryPackage)}% on
            yearly plans
            {isYearly ? " (compared to monthly)" : ""}
          </Tag>
        </Space>
        <Flex wrap="wrap" justify="center" gap={16}>
          {data?.getCountryPackage?.map((pkg: CountryPackage) => {
            const savings = getYearlySavings(
              pkg.monthlyPrice,
              pkg.yearlyPrice,
              pkg.currency
            );

            return (
              <Col style={{ width: 300 }} key={pkg.packageId}>
                <Badge.Ribbon
                  text={pkg.isPopular ? "Most Popular" : null}
                  color="blue"
                  style={
                    {
                      display: pkg.isPopular ? "block" : "none",
                      zIndex: 1,
                      marginTop: -12,
                    } as React.CSSProperties
                  }
                >
                  <Card
                    style={cardStyle(pkg.isPopular)}
                    styles={{ body: { padding: 24 } }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: 16,
                        height: 100,
                      }}
                    >
                      <Title level={3} style={{ marginBottom: 4 }}>
                        {pkg.name}
                      </Title>

                      <div style={{ marginTop: 16 }}>
                        <Title level={2} style={{ marginBottom: 0 }}>
                          {formatPrice(
                            pkg.monthlyPrice,
                            pkg.yearlyPrice,
                            isYearly,
                            pkg.currency
                          )}
                        </Title>
                        {isYearly && Number(savings) > 0 && (
                          <Text type="success" strong style={{ fontSize: 14 }}>
                            Save {savings}% annually
                          </Text>
                        )}
                      </div>
                    </div>

                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <Space>
                        <TabletSmartphone size={14} />
                        <Text>
                          {pkg.accessType === "WebOnly"
                            ? "Web Access Only"
                            : "Web + Mobile App"}
                        </Text>
                      </Space>

                      <Space>
                        <Users2Icon size={14} />
                        <Text>Up to {pkg.numberOfUsers} members</Text>
                      </Space>

                      <Space>
                        <ShieldAlertIcon size={14} />
                        {/* <ShieldOutlined /> */}
                        <Text>
                          {pkg.adminUsers} admin user
                          {pkg.adminUsers > 1 ? "s" : ""}
                        </Text>
                      </Space>

                      <Divider style={{ margin: "12px 0" }} />

                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        {pkg.benefits
                          .filter((benefit) => benefit.trim() !== "")
                          .map((benefit, index) => (
                            <Space key={index} align="start">
                              <CheckOutlined style={{ color: "#52c41a" }} />
                              <Text>{benefit}</Text>
                            </Space>
                          ))}
                      </Space>
                    </Space>

                    <div style={{ marginTop: 24 }}>
                      <Button
                        loading={activePackage?.packageId === pkg.packageId}
                        onClick={() => {
                          setActivePackage(pkg);
                        }}
                        type={pkg.isPopular ? "primary" : "default"}
                        block
                      >
                        Get Started
                      </Button>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </Col>
            );
          })}
        </Flex>

        {activePackage && (
          <BuyPlanPopUp
            activePackage={activePackage}
            visible={activePackage ? true : false}
            onClose={() => {
              setActivePackage(null);
            }}
          />
        )}

        <CustomRequestForm />
      </Card>
    </>
  );
};

export default BuyPlan;
