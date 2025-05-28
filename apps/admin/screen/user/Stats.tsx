import {
  AlertOutlined,
  CheckCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Typography } from "antd";
import { Content } from "next/font/google";
import React from "react";

const Stats = () => {
  const { Text } = Typography;
  return (
    <Row gutter={[16, 24]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Total Users"
            value={1248}
            prefix={<UserOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: 14 }}>
                +12% from last month
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Pending Approvals"
            value={23}
            prefix={<AlertOutlined style={{ color: "#faad14" }} />}
            suffix={
              <Text type="secondary" style={{ fontSize: 14 }}>
                +2 new today
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Blocked Users"
            value={7}
            prefix={<LockOutlined style={{ color: "#f5222d" }} />}
            suffix={
              <Text type="secondary" style={{ fontSize: 14 }}>
                +1 from last week
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Active Today"
            value={573}
            prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
            suffix={
              <Text type="secondary" style={{ fontSize: 14 }}>
                +5% from yesterday
              </Text>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;
