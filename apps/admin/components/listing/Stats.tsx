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

const Stats = () => {
  const { Text } = Typography;
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
      <Col xs={24} sm={12} lg={4}>
        <Card>
          <Statistic
            title="Total Listings"
            value={24}
            prefix={<ShoppingOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +2 from last month
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={4}>
        <Card>
          <Statistic
            title="Active Listings"
            value={18}
            prefix={<RiseOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                75% of total
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={4}>
        <Card>
          <Statistic
            title="Verified Listings"
            value={12}
            prefix={""}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                67% rate
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={4}>
        <Card>
          <Statistic
            title="Total Views"
            value={1247}
            prefix={<EyeOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +15% this week
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={4}>
        <Card>
          <Statistic
            title="Total Likes"
            value={89}
            prefix={<StarOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +8 this week
              </Text>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;
