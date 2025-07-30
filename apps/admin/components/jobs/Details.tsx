import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Drawer,
  List,
  Space,
  Statistic,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";

import {
  CalendarOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DislikeOutlined,
  DollarOutlined,
  EyeOutlined,
  FlagOutlined,
  GlobalOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
  UndoOutlined,
  UnlockOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";

import moment from "moment";
import { MarketPlaceListing } from "../../graphql/actions/listing";
import { Row, Col, Rate } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { GetCurrency } from "../../screen/Currency";
import { getEntity } from "../../graphql/actions";
import TabPane from "antd/es/tabs/TabPane";
import { Job } from "../../graphql/actions/jobs";
import { getStatusTag, getVerificationTag } from "../discussion-forum/utils";

const { Title, Text, Paragraph } = Typography;
const Details = ({
  job,
  isDrawerOpen,
  setIsDrawerOpen,
  handleAction,
}: {
  job: Job | null;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  handleAction: (
    action:
      | "APPROVE"
      | "DISABLE"
      | "ENABLE"
      | "UNBLOCK"
      | "REJECT"
      | "FLAG"
      | "VERIFY"
      | "UNVERIFY"
      | "REAPPROVE",
    listing: Job | null
  ) => void;
}) => {
  const [activeTab, setActiveTab] = useState("description");

  const requirements = [
    "5+ years of experience with React and TypeScript",
    "Strong understanding of modern JavaScript (ES6+)",
    "Experience with state management (Redux, Zustand)",
    "Knowledge of testing frameworks (Jest, React Testing Library)",
    "Familiarity with CI/CD pipelines",
    "Bachelor's degree in Computer Science or equivalent experience",
  ];

  const responsibilities = [
    "Develop and maintain frontend applications",
    "Collaborate with design and backend teams",
    "Write clean, maintainable, and testable code",
    "Participate in code reviews and technical discussions",
    "Mentor junior developers",
  ];

  const benefits = [
    "Competitive salary and equity",
    "Health, dental, and vision insurance",
    "401(k) with company matching",
    "Flexible work arrangements",
    "Professional development budget",
    "Unlimited PTO",
  ];

  const skills = [
    "React",
    "TypeScript",
    "JavaScript",
    "CSS",
    "HTML",
    "Git",
    "Agile",
  ];

  const verificationChecks = [
    { label: "Company Verified", verified: true },
    { label: "Salary Verified", verified: true },
    { label: "Requirements Verified", verified: true },
    { label: "Contact Verified", verified: true },
    { label: "Legal Compliance", verified: true },
  ];
  const { Title, Text, Paragraph } = Typography;

  const { data, loading } = getEntity();
  return (
    <Drawer
      title="User Details"
      placement="right"
      onClose={() => setIsDrawerOpen(false)}
      open={isDrawerOpen}
      width={1200}
      extra={
        <Space wrap>
          {job?.status === "PENDING" && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAction("APPROVE", job)}
              >
                Approve
              </Button>
              <Button
                danger
                icon={<DislikeOutlined />}
                onClick={() => handleAction("REJECT", job)}
              >
                Reject
              </Button>
            </>
          )}

          {job?.status === "BLOCKED" ? (
            <Button
              type="primary"
              icon={<UnlockOutlined />}
              onClick={() => handleAction("UNBLOCK", job)}
            >
              Unblock
            </Button>
          ) : (
            job?.status === "REJECTED" && (
              <>
                <Button
                  type="primary"
                  icon={<UndoOutlined />}
                  onClick={() => handleAction("REAPPROVE", job)}
                >
                  Re-approve User
                </Button>
              </>
            )
          )}

          {job?.status === "APPROVED" && (
            <>
              {job?.verification?.isVerified ? (
                <Button
                  danger
                  icon={<SafetyCertificateOutlined />}
                  onClick={() => handleAction("UNVERIFY", job)}
                >
                  Remove Verification
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<SafetyCertificateOutlined />}
                  onClick={() => handleAction("VERIFY", job)}
                >
                  Verify Job
                </Button>
              )}
              <Button
                icon={<UserDeleteOutlined />}
                onClick={() => handleAction("DISABLE", job)}
              >
                Disable
              </Button>
            </>
          )}

          {job?.status === "DISABLED" && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAction("ENABLE", job)}
              >
                Enable
              </Button>
            </>
          )}
        </Space>
      }
    >
      <>
        <div style={{ padding: "24px" }}>
          {/* Header */}

          {/* Job Info Section */}
          <div style={{ marginBottom: "24px" }}>
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Space size={80} style={{ width: "100%" }}>
                  <Avatar
                    size={100}
                    src={
                      `https://cdn.thrico.network/${job?.company?.logo}` ||
                      "/placeholder.svg"
                    }
                    style={{
                      backgroundColor: "#f0f0f0",
                      color: "#999",
                    }}
                  />
                  <div>
                    <Title
                      level={3}
                      style={{ margin: "0 0 8px 0", fontWeight: 600 }}
                    >
                      {job?.title}
                    </Title>
                    <Text
                      style={{
                        fontSize: "16px",
                        color: "#666",
                        display: "block",
                        marginBottom: "16px",
                      }}
                    >
                      {job?.company.name}
                    </Text>

                    <Space size={24} wrap>
                      <Space size={4}>
                        <EnvironmentOutlined style={{ color: "#666" }} />
                        <Text style={{ color: "#666" }}>{job?.location}</Text>
                      </Space>
                      <Space size={4}>
                        <ClockCircleOutlined style={{ color: "#666" }} />
                        <Text style={{ color: "#666" }}>{job?.jobType}</Text>
                      </Space>
                      <Space size={4}>
                        <GlobalOutlined style={{ color: "#666" }} />
                        <Text style={{ color: "#666" }}>
                          {job?.workplaceType}
                        </Text>
                      </Space>
                      <Space size={4}>
                        <DollarOutlined style={{ color: "#666" }} />
                        <Text style={{ color: "#666" }}>{job?.salary}</Text>
                      </Space>
                    </Space>

                    <div style={{ marginTop: "16px" }}>
                      <Space size={8}>
                        {getStatusTag(job?.status || "PENDING")}

                        {getVerificationTag(
                          job?.verification?.isVerified || false
                        )}

                        <Tag>{job?.experienceLevel}</Tag>
                      </Space>
                    </div>
                  </div>
                </Space>
              </Col>
            </Row>
          </div>

          {/* Statistics Cards */}
          <Row gutter={16} style={{ marginBottom: "32px" }}>
            <Col span={8}>
              <Card
                style={{ textAlign: "center", border: "1px solid #f0f0f0" }}
              >
                <Statistic
                  title="Applications"
                  value={47}
                  precision={2}
                  prefix={<UserOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{ textAlign: "center", border: "1px solid #f0f0f0" }}
              >
                <Statistic
                  title="Views"
                  value={47}
                  precision={2}
                  prefix={<EyeOutlined />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{ textAlign: "center", border: "1px solid #f0f0f0" }}
              >
                <Statistic
                  title="Views"
                  value={"-90 "}
                  precision={2}
                  prefix={<CalendarOutlined />}
                  suffix="Days"
                />
              </Card>
            </Col>
          </Row>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            style={{ marginTop: "24px" }}
            tabBarStyle={{ marginBottom: "24px" }}
          >
            <TabPane tab="Description" key="description">
              <div>
                <Title level={4} style={{ marginBottom: "16px" }}>
                  Job Description
                </Title>
                <Paragraph
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    marginBottom: "32px",
                  }}
                >
                  {job?.description}
                </Paragraph>

                <Title level={4} style={{ marginBottom: "16px" }}>
                  Required Skills
                </Title>
                <Space size={8} wrap>
                  {job?.skills.map((skill, index) => (
                    <Tag
                      key={index}
                      style={{
                        padding: "6px 16px",
                        borderRadius: "16px",
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #d9d9d9",
                        fontSize: "14px",
                      }}
                    >
                      {skill}
                    </Tag>
                  ))}
                </Space>
              </div>
            </TabPane>

            <TabPane tab="Requirements" key="requirements">
              <div>
                <Title level={4} style={{ marginBottom: "24px" }}>
                  Requirements
                </Title>
                <List
                  dataSource={job?.requirements}
                  renderItem={(item) => (
                    <List.Item style={{ border: "none", padding: "8px 0" }}>
                      <Space align="start">
                        <CheckCircleOutlined
                          style={{ color: "#52c41a", marginTop: "2px" }}
                        />
                        <Text style={{ fontSize: "16px" }}>{item}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
            </TabPane>

            <TabPane tab="Responsibilities" key="responsibilities">
              <div>
                <Title level={4} style={{ marginBottom: "24px" }}>
                  Key Responsibilities
                </Title>
                <List
                  dataSource={job?.responsibilities}
                  renderItem={(item) => (
                    <List.Item style={{ border: "none", padding: "8px 0" }}>
                      <Space align="start">
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "#1890ff",
                            marginTop: "8px",
                            flexShrink: 0,
                          }}
                        />
                        <Text style={{ fontSize: "16px" }}>{item}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
            </TabPane>

            <TabPane tab="Benefits" key="benefits">
              <div>
                <Title level={4} style={{ marginBottom: "24px" }}>
                  Benefits & Perks
                </Title>
                <List
                  dataSource={job?.benefits}
                  renderItem={(item) => (
                    <List.Item style={{ border: "none", padding: "8px 0" }}>
                      <Space align="start">
                        <StarOutlined
                          style={{ color: "#faad14", marginTop: "2px" }}
                        />
                        <Text style={{ fontSize: "16px" }}>{item}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </>
    </Drawer>
  );
};

export default Details;
