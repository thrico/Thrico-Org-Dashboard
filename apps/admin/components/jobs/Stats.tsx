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

const Stats = () => {
  const { Text } = Typography;

  // Dummy data fallback

  const { data } = useJobStats();
  const stats = data?.getJobStats;
  return (
    <Row gutter={[16, 24]} style={{ marginBottom: "24px" }}>
      <Col xs={24} sm={12} lg={4}>
        <Card>
          <Statistic
            title="Total Jobs"
            value={stats?.totalJobs}
            prefix={<ShoppingOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +{stats?.applicationsLastWeek} this month
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={4}>
        <Card>
          <Statistic
            title="Active Jobs"
            value={stats?.activeJobs}
            prefix={<RiseOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {stats?.totalJobs}% of total jobs
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={4}>
        <Card>
          <Statistic
            title="Total Applications"
            value={stats?.totalApplications}
            prefix={<UserOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +{stats?.applicationsThisWeek} this week
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={4}>
        <Card>
          <Statistic
            title="Total Views"
            value={stats?.totalViews}
            prefix={<EyeOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +{stats?.viewsLastWeek}% from last week
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={4}>
        <Card>
          <Statistic
            title="Avg. Applications"
            value={stats?.totalApplications}
            prefix={<StarOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {stats?.avgApplications} per job posting
              </Text>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;
