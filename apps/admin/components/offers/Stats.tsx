import {
  AlertOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  LockOutlined,
  RiseOutlined,
  ShoppingOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Typography } from "antd";
import { Content } from "next/font/google";
import React from "react";
import { useGetListingStats } from "../../graphql/actions/listing";
import { useJobStats } from "../../graphql/actions/jobs";
import { useGetOfferStats } from "../../graphql/actions/offers";

const Stats = () => {
  const { Text } = Typography;

  // Dummy data fallback

  const { data } = useGetOfferStats();
  const stats = data?.getOfferStats;
  return (
    <Row gutter={[16, 24]} style={{ marginBottom: "24px" }}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Total Offers"
            value={stats?.total}
            prefix={<ShoppingOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +{stats?.thisMonth} this month
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Active Offers"
            value={stats?.active}
            prefix={<RiseOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {stats?.activePercent}% of total offers
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="InActive Offer"
            value={stats?.inactive}
            prefix={<UserOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +{stats?.inactivePercent} of total offers
              </Text>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;
