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
import { allPlanPercentage } from "../utils.tsx";
import PackageCard from "./PackageCard";
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
          {data?.getCountryPackage?.map((pkg: CountryPackage) => (
            <PackageCard
              key={pkg.packageId}
              pkg={pkg}
              isYearly={isYearly}
              activePackage={activePackage}
              setActivePackage={setActivePackage}
            />
          ))}
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
