import React from "react";
import {
  Card,
  Button,
  Badge,
  Divider,
  Space,
  Typography,
  Col,
  Tag,
} from "antd";
import { CheckOutlined } from "@ant-design/icons";
import {
  TabletSmartphone,
  Users2Icon,
  ShieldAlertIcon,
  ArrowUpIcon,
} from "lucide-react";
import { cardStyle } from "../stye";
import { formatPrice, renderModuleIcon } from "../utils.tsx";
import { CountryPackage, UpgradePlanSummary } from "../ts-types";

const { Title, Text } = Typography;

interface UpgradePackageCardProps {
  pkg: CountryPackage;
  isYearly: boolean;
  planOverview: any;
  activePackage: CountryPackage | null;
  loadingPlan: boolean;
  onUpgrade: () => void;
}

const getYearlySavings = (monthly: number, yearly: number) => {
  if (monthly === 0 || yearly === 0) return 0;
  const monthlyTotal = monthly * 12;
  const savings = monthlyTotal - yearly;
  return Math.round((savings / monthlyTotal) * 100);
};

const UpgradePackageCard: React.FC<UpgradePackageCardProps> = ({
  pkg,
  isYearly,
  planOverview,
  activePackage,
  loadingPlan,
  onUpgrade,
}) => {
  const savings = getYearlySavings(pkg.monthlyPrice, pkg.yearlyPrice);
  return (
    <Col style={{ width: 300 }} key={pkg.packageId}>
      <Badge.Ribbon
        text={"Upgrade"}
        color="blue"
        style={{ display: "block", zIndex: 1, marginTop: -12 }}
      >
        <Card style={cardStyle(true)} styles={{ body: { padding: 24 } }}>
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
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
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
                  pkg.numberOfUsers - (planOverview?.userUsage.limit ?? 0);
                return <>{extraUsers > 0 && <Tag> + {extraUsers} </Tag>}</>;
              })()}
            </Space>
            <Space>
              <ShieldAlertIcon size={14} />
              <Text>
                {pkg.adminUsers} admin user{pkg.adminUsers > 1 ? "s" : ""}
              </Text>
              {(() => {
                const extraAdmins =
                  pkg.adminUsers - (planOverview?.adminUsers?.limit ?? 0);
                return <>{extraAdmins > 0 && <Tag> + {extraAdmins} </Tag>}</>;
              })()}
            </Space>
            <Divider style={{ margin: "12px 0" }} />
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              {pkg.benefits
                .filter((benefit) => benefit.trim() !== "")
                .map((benefit, index) => (
                  <Space key={index} align="start">
                    <CheckOutlined style={{ color: "#52c41a" }} />
                    <Text>{benefit}</Text>
                  </Space>
                ))}
            </Space>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              {pkg.modules.map((module, index) => (
                <Space key={index} align="start">
                  {renderModuleIcon(module.icon)}
                  <Text>{module.name}</Text>
                </Space>
              ))}
            </Space>
          </Space>
          <div style={{ marginTop: 24 }}>
            <Button
              loading={
                loadingPlan && activePackage?.packageId === pkg.packageId
              }
              onClick={onUpgrade}
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
};

export default UpgradePackageCard;
