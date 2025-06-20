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
  const dummyStats = {
    totalJobs: 3,
    jobsDiff: 2,
    activeJobs: 2,
    activeJobsPercent: 67,
    totalApplications: 159,
    applicationsDiff: 23,
    totalViews: 835,
    viewsPercent: 15,
    avgApplications: 53,
  };
  const displayStats = dummyStats;

  // Dummy data fallback

  return (
    <Row gutter={[16, 24]} style={{ marginBottom: "24px" }}>
      <Col xs={24} sm={12} lg={5}>
        <Card>
          <Statistic
            title="Total Jobs"
            value={displayStats.totalJobs}
            prefix={<ShoppingOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +{displayStats.jobsDiff} this month
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={5}>
        <Card>
          <Statistic
            title="Active Jobs"
            value={displayStats.activeJobs}
            prefix={<RiseOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {displayStats.activeJobsPercent}% of total jobs
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={5}>
        <Card>
          <Statistic
            title="Total Applications"
            value={displayStats.totalApplications}
            prefix={<UserOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +{displayStats.applicationsDiff} this week
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={5}>
        <Card>
          <Statistic
            title="Total Views"
            value={displayStats.totalViews}
            prefix={<EyeOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                +{displayStats.viewsPercent}% from last week
              </Text>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={5}>
        <Card>
          <Statistic
            title="Avg. Applications"
            value={displayStats.avgApplications}
            prefix={<StarOutlined />}
            suffix={
              <Text type="secondary" style={{ fontSize: "12px" }}>
                per job posting
              </Text>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;
