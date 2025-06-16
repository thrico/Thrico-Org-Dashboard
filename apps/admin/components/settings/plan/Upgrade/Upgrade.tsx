import React, { useState } from "react";
import {
  getCountryPackage,
  getPlanOverview,
  getUpgradePlanSummary,
} from "../../../../graphql/actions/plan";

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
  Typography,
} from "antd";
import { CountryPackage, UpgradePlanSummary } from "../ts-types";
import { cardStyle } from "../stye";
import { allPlanPercentage, formatPrice } from "../utils";
import { CheckOutlined, UserOutlined } from "@ant-design/icons";
import {
  ArrowUp01Icon,
  ArrowUpIcon,
  ShieldAlertIcon,
  TabletSmartphone,
  Users2Icon,
} from "lucide-react";
import CustomRequestForm from "../CustomRequest/Form";
import UpgradeModal from "./UpgradeModal";
import { on } from "events";
const { Title, Text, Paragraph } = Typography;

const Upgrade = () => {
  const { data, loading } = getCountryPackage();
  const [active, setActive] = useState<UpgradePlanSummary | null>(null);
  const [activePackage, setActivePackage] = useState<CountryPackage | null>(
    null
  );
  const { data: myPlan } = getPlanOverview();
  const planOverview = myPlan?.getPlanOverview;
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const getYearlySavings = (monthly: number, yearly: number) => {
    if (monthly === 0 || yearly === 0) return 0;
    const monthlyTotal = monthly * 12;
    const savings = monthlyTotal - yearly;
    return Math.round((savings / monthlyTotal) * 100);
  };
  const [get, { loading: loadingPlan }] = getUpgradePlanSummary({
    onCompleted: (data: { getUpgradePlanSummary: UpgradePlanSummary }) => {
      setActive(data.getUpgradePlanSummary);
    },
  });
  return (
    <>
      <Card style={{ width: "90%" }} loading={loading}>
        <Flex justify="space-between" align="center" wrap="wrap">
          <Space style={{ marginBottom: 20 }} direction="vertical">
            <Title level={3}>Upgrade Your Plan</Title>
            <Paragraph type="secondary">
              Get more features and higher limits for your growing team
            </Paragraph>
          </Space>
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
        </Flex>
        <Flex wrap="wrap" justify="center" gap={35}>
          {data?.getCountryPackage?.map((pkg: CountryPackage) => {
            const savings = getYearlySavings(pkg.monthlyPrice, pkg.yearlyPrice);

            return (
              <Col style={{ width: 300 }} key={pkg.packageId}>
                <Badge.Ribbon
                  text={"Upgrade"}
                  color="blue"
                  style={
                    {
                      display: "block",
                      zIndex: 1,
                      marginTop: -12,
                    } as React.CSSProperties
                  }
                >
                  <Card
                    style={cardStyle(true)}
                    styles={{ body: { padding: 24 } }}
                  >
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
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
                        {isYearly && savings > 0 && (
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
                        <Text>{pkg.numberOfUsers} users</Text>

                        {(() => {
                          const extraUsers =
                            pkg.numberOfUsers -
                            (planOverview?.userUsage.limit ?? 0);
                          return (
                            <>{extraUsers > 0 && <Tag> + {extraUsers} </Tag>}</>
                          );
                        })()}
                      </Space>

                      <Space>
                        <ShieldAlertIcon size={14} />
                        <Text>
                          {pkg.adminUsers} admin user
                          {pkg.adminUsers > 1 ? "s" : ""}
                        </Text>

                        {(() => {
                          const extraAdmins =
                            pkg.adminUsers -
                            (planOverview?.adminUsers?.limit ?? 0);
                          return (
                            <>
                              {" "}
                              {extraAdmins > 0 && <Tag> + {extraAdmins} </Tag>}
                            </>
                          );
                        })()}
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
                        loading={
                          loadingPlan &&
                          activePackage?.packageId === pkg.packageId
                        }
                        onClick={() => {
                          get({
                            variables: {
                              input: {
                                packageId: pkg.packageId,
                              },
                            },
                          });
                          setActivePackage(pkg);
                        }}
                        type={"primary"}
                        block
                        icon={<ArrowUpIcon size={15} />}
                      >
                        Upgrade
                      </Button>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </Col>
            );
          })}
        </Flex>

        <CustomRequestForm />
      </Card>
      {active && (
        <UpgradeModal
          activePackage={activePackage}
          summary={active}
          visible={active ? true : false}
          onClose={() => {
            setActive(null);
            setActivePackage(null);
          }}
        />
      )}
    </>
  );
};

export default Upgrade;
