import React from "react";
import { Card, Button, Badge, Divider, Space, Typography, Col } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { TabletSmartphone, Users2Icon, ShieldAlertIcon } from "lucide-react";
import { cardStyle } from "../stye";
import { formatPrice, getYearlySavings, renderModuleIcon } from "../utils.tsx";
import { CountryPackage } from "../ts-types";

const { Title, Text: AntText } = Typography;

interface PackageCardProps {
  pkg: CountryPackage;
  isYearly: boolean;
  activePackage: CountryPackage | null;
  setActivePackage: (pkg: CountryPackage) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  isYearly,
  activePackage,
  setActivePackage,
}) => {
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
        style={{
          display: pkg.isPopular ? "block" : "none",
          zIndex: 1,
          marginTop: -12,
        }}
      >
        <Card
          style={cardStyle(pkg.isPopular)}
          styles={{ body: { padding: 24 } }}
        >
          <div style={{ textAlign: "center", marginBottom: 16, height: 100 }}>
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
                <AntText type="success" strong style={{ fontSize: 14 }}>
                  Save {savings}% annually
                </AntText>
              )}
            </div>
          </div>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Space>
              <TabletSmartphone size={14} />
              <AntText>
                {pkg.accessType === "WebOnly"
                  ? "Web Access Only"
                  : "Web + Mobile App"}
              </AntText>
            </Space>
            <Space>
              <Users2Icon size={14} />
              <AntText>Up to {pkg.numberOfUsers} members</AntText>
            </Space>
            <Space>
              <ShieldAlertIcon size={14} />
              <AntText>
                {pkg.adminUsers} admin user{pkg.adminUsers > 1 ? "s" : ""}
              </AntText>
            </Space>
            <Divider style={{ margin: "12px 0" }} />
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              {pkg.benefits
                .filter((benefit) => benefit.trim() !== "")
                .map((benefit, index) => (
                  <Space key={index} align="start">
                    <CheckOutlined style={{ color: "#52c41a" }} />
                    <AntText>{benefit}</AntText>
                  </Space>
                ))}
            </Space>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              {pkg.modules.map((module, index) => (
                <Space key={index} align="start">
                  {renderModuleIcon(module.icon)}
                  <AntText>{module.name}</AntText>
                </Space>
              ))}
            </Space>
          </Space>
          <div style={{ marginTop: 24 }}>
            <Button
              loading={activePackage?.packageId === pkg.packageId}
              onClick={() => setActivePackage(pkg)}
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
};

export default PackageCard;
