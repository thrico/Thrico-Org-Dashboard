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

const Stats = () => {
  const { data } = useGetListingStats();
  const { Text } = Typography;
  const stats = data?.getListingStats;
  return (
    <Row gutter={[16, 24]} style={{ marginBottom: "24px" }}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Total Listings"
            value={stats?.totalListings || 0}
            prefix={<ShoppingOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +{stats?.listingsDiff} from last month
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Active Listings"
            value={stats?.activeListings || 0}
            prefix={<RiseOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {stats?.listingsDiff} of total
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Verified Listings"
            value={stats?.verifiedListings || 0}
            prefix={""}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {stats?.verifiedPercent}% rate
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Total Views"
            value={stats?.totalViews || 0}
            prefix={<EyeOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +{stats?.viewsPercent}% this week
              </Text>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;
